import React, { useState } from "react";
import BookTable from "../../Components/bookTable/BookTable";
import Filters from "../../Components/filters/Filters";
import BookDetailModal from "../../Components/bookDetailModal/BookDetailModal";
import Header from "../../Components/header/Header";
import ActionMenu from "../../Components/actionMenu/ActionMenu";
import "./Home.css";

const Home = ({ books, setBooks }) => {
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    category: "",
    author: "",
    priceMin: "",
    priceMax: "",
  });

  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter((book) => {
    if (filters.title && !book.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.status && book.status !== filters.status) return false;
    if (filters.category && book.category !== filters.category) return false;
    if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.priceMin && book.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && book.price > parseFloat(filters.priceMax)) return false;
    return true;
  });

  const exportToCSV = (data, filename = "books.csv") => {
    const headers = [
      "Titre",
      "Auteur",
      "Année",
      "Catégorie",
      "Statut",
      "Prix",
      "Propriétaire",
      "Locataire",
      "Date de location",
      "Date de retour",
      "Durée"
    ];

    const rows = data.map((book) => [
      book.title,
      book.author,
      book.year,
      book.category,
      book.status,
      book.price,
      book.owner,
      book.rentalInfo?.renter || "",
      book.rentalInfo?.rentDate || "",
      book.rentalInfo?.returnDate || "",
      book.rentalInfo?.duration || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header username="Florian" />
      <div style={{ padding: "2rem 1rem" }}>
        <h2>Liste des livres</h2>
        <ActionMenu />
        <Filters filters={filters} setFilters={setFilters} books={books} />

        <div className="actions-container">
          <button onClick={() => alert("Ajouter un livre")}>Ajouter un livre</button>
          <button onClick={() => alert("Modifier un livre")}>Modifier un livre</button>
          <button onClick={() => alert("Supprimer un livre")}>Supprimer un livre</button>
          <button onClick={() => exportToCSV(filteredBooks, "books-filtrés.csv")}>
            Exporter CSV (filtré)
          </button>
          <button onClick={() => exportToCSV(books, "books-complet.csv")}>
            Exporter CSV (complet)
          </button>
        </div>

        <BookTable books={filteredBooks} setSelectedBook={setSelectedBook} />

        {selectedBook && (
          <BookDetailModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
