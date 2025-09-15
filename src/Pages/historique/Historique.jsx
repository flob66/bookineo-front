import React, { useState } from "react";
import Header from "../../Components/header/Header";

const Historique = ({ books }) => {
  const [user, setUser] = useState({
      email: "florian@example.com",
      password: "password123",
      firstName: "Florian",
      lastName: "Bar",
      birthDate: "1990-01-01",
    });

  const history = books.filter((b) => b.rentalInfo);

  const [filters, setFilters] = useState({
    title: "",
    owner: "",
    renter: "",
    date: "",
  });

  const filteredHistory = history.filter((book) => {
    if (filters.title && !book.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.owner && !book.owner.toLowerCase().includes(filters.owner.toLowerCase())) return false;
    if (filters.renter && !book.rentalInfo.renter.toLowerCase().includes(filters.renter.toLowerCase())) return false;
    if (filters.date && book.rentalInfo.rentDate !== filters.date) return false;
    return true;
  });

  return (
    <><Header username={user.firstName} /><div style={{ padding: "1rem" }}>
      <h2>Historique des Locations</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Filtrer par livre"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <input
          type="text"
          placeholder="Filtrer par propriétaire"
          value={filters.owner}
          onChange={(e) => setFilters({ ...filters, owner: e.target.value })} />
        <input
          type="text"
          placeholder="Filtrer par locataire"
          value={filters.renter}
          onChange={(e) => setFilters({ ...filters, renter: e.target.value })} />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
      </div>

      {filteredHistory.length === 0 ? (
        <p>Aucun historique disponible.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Propriétaire</th>
              <th>Locataire</th>
              <th>Date de location</th>
              <th>Date de retour</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.owner}</td>
                <td>{book.rentalInfo.renter}</td>
                <td>{book.rentalInfo.rentDate}</td>
                <td>{book.rentalInfo.returnDate}</td>
                <td>{book.rentalInfo.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div></>
  );
};

export default Historique;
