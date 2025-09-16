import React, { useState, useMemo } from "react";
import Header from "../../Components/header/Header";

const Historique = ({ books }) => {
  const [user, setUser] = useState({
      email: "florian@example.com",
      password: "password123",
      firstName: "Florian",
      lastName: "Bar",
      birthDate: "1990-01-01",
    });

  const allEntries = useMemo(() => {
    const entries = [];
    books.forEach((b) => {
      (b.history || []).forEach((h) => {
        entries.push({
          bookId: b.id,
          title: b.title,
          owner: b.owner,
          renter: h.renter,
          rentDate: h.rentDate,
          returnDate: h.returnDate,
          duration: h.duration,
          comment: h.comment || "",
        });
      });
    });
    return entries;
  }, [books]);

  const history = books.filter((b) => b.rentalInfo);

  const [filters, setFilters] = useState({
    title: "",
    owner: "",
    renter: "",
    date: "",
  });

 const filtered = allEntries.filter((e) => {
    if (filters.title && !e.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.owner && !e.owner.toLowerCase().includes(filters.owner.toLowerCase())) return false;
    if (filters.renter && !e.renter.toLowerCase().includes(filters.renter.toLowerCase())) return false;
    if (filters.date && e.rentDate !== filters.date) return false;
    return true;
  });

  return (
    <><Header username={user.firstName} />
   <div style={{ padding: "1rem" }}>
      <h2>Historique des locations</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input placeholder="Livre" value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <input placeholder="Propriétaire" value={filters.owner} onChange={(e) => setFilters({ ...filters, owner: e.target.value })} />
        <input placeholder="Locataire" value={filters.renter} onChange={(e) => setFilters({ ...filters, renter: e.target.value })} />
        <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
      </div>

      {filtered.length === 0 ? (
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
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, idx) => (
              <tr key={idx}>
                <td>{e.title}</td>
                <td>{e.owner}</td>
                <td>{e.renter}</td>
                <td>{e.rentDate}</td>
                <td>{e.returnDate}</td>
                <td>{e.duration}</td>
                <td>{e.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div></>
  );
};

export default Historique;
