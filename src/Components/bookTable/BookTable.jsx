import React from "react";
import "./BookTable.css";

const BookTable = ({ books, setSelectedBook }) => {
  const handleDetail = (book) => {
    setSelectedBook(book);
  };

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Année</th>
          <th>Catégorie</th>
          <th>Statut</th>
          <th>Prix</th>
          <th>Propriétaire</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr
            key={book.id}
            className={book.status === "Disponible" ? "available" : "rented"}
          >
            <td data-label="Titre">{book.title}</td>
            <td data-label="Auteur">{book.author}</td>
            <td data-label="Année">{book.year}</td>
            <td data-label="Catégorie">{book.category}</td>
            <td data-label="Statut">{book.status}</td>
            <td data-label="Prix">{book.price}€</td>
            <td data-label="Propriétaire">{book.owner}</td>
            <td data-label="Actions">
              <button onClick={() => handleDetail(book)}>Détail</button>
              <button onClick={() => alert("Modifier")}>Modifier</button>
              <button onClick={() => alert("Supprimer")}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
