import React from "react";

const Filters = ({ filters, setFilters, books }) => {
  const categories = [...new Set(books.map((b) => b.category))];
  const authors = [...new Set(books.map((b) => b.author))];

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Recherche par titre"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">Tous</option>
        <option value="1">Disponible</option>
        <option value="0">Loué</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        list="authors"
        placeholder="Auteur"
        value={filters.author}
        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
      />
      <datalist id="authors">
        {authors.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>

      <input
        type="number"
        placeholder="Prix min"
        value={filters.priceMin}
        onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
        style={{ width: "80px" }}
      />
      <input
        type="number"
        placeholder="Prix max"
        value={filters.priceMax}
        onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
        style={{ width: "80px" }}
      />
    </div>
  );
};

export default Filters;
