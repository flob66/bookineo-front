import React, { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import { getUser } from "../../utils/auth";
import { getRents } from "../../http/rent";

const Historique = () => {
  const [user] = useState(getUser() || {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
  });

  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    owner: "",
    renter: "",
    date: "",
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getRents();

        const mapped = data.map((r) => ({
          id: r.id,
          title: r.title || "Inconnu",
          owner: r.owner || "Inconnu",
          renter: `${r.renter_first_name || ""} ${r.renter_last_name || ""}`.trim(),
          rentDate: r.date_start_rent?.split(" ")[0] || "-",
          returnDate: r.return_date?.split(" ")[0] || "Non restitué",
          duration: r.number_days_rent ? `${r.number_days_rent} jours` : "",
          comment: r.comment || "",
        }));

        setEntries(mapped);
      } catch (error) {
        console.error("Erreur lors du chargement de l’historique:", error);
        setEntries([]);
      }
    };

    fetchHistory();
  }, []);

  const filtered = entries.filter((e) => {
    if (filters.title && !e.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.owner && !e.owner.toLowerCase().includes(filters.owner.toLowerCase())) return false;
    if (filters.renter && !e.renter.toLowerCase().includes(filters.renter.toLowerCase())) return false;
    if (filters.date && e.rentDate !== filters.date) return false;
    return true;
  });

  return (
    <>
      <Header username={user.first_name} />
      <div style={{ padding: "1rem" }}>
        <h2>Historique des locations</h2>

        <div style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <input
            placeholder="Livre"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            placeholder="Propriétaire"
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
          />
          <input
            placeholder="Locataire"
            value={filters.renter}
            onChange={(e) => setFilters({ ...filters, renter: e.target.value })}
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
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
              {filtered.map((e) => (
                <tr key={e.id}>
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
      </div>
    </>
  );
};

export default Historique;
