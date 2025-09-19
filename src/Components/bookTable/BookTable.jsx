import React from "react";
import "./BookTable.css";
import { useNavigate } from "react-router-dom";
import infoIcon from "../../assets/svg/info.svg"; 
import editIcon from "../../assets/svg/edit.svg"; 
import deleteIcon from "../../assets/svg/delete.svg"; 
import { getUser } from "../../utils/auth";

const BookTable = ({ books, setSelectedBook, setDeleteBook  }) => {
  const navigate = useNavigate();

  const handleDetail = (book) => {
    setSelectedBook(book);
  };

  const user = getUser();

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
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr
            key={book.id}
            className={book.status === "1" ? "available" : "rented"}
          >
            <td data-label="Titre">{book.title}</td>
            <td data-label="Auteur">{book.author}</td>
            <td data-label="Année">{new Date(book.published_date).getFullYear()}</td>
            <td data-label="Catégorie">{book.category}</td>
            <td data-label="Statut">{book.status === "1" ? "Disponible" : "Loué"}</td>
            <td data-label="Prix">{book.price}€</td>
            <td data-label="Propriétaire">{book.owner}</td>
            <td data-label="ISBN">{book.isbn}</td>
            <td data-label="Actions">
              <button className="options-btn" onClick={() => handleDetail(book)} title="Détail"><img src={infoIcon} alt="info icon" /></button>
              {user?.role === 1 && (
               <>
                 <button className="options-btn" onClick={() => navigate(`/edit-book/${book.id}`)} title="Modifier"><img src={editIcon} alt="edit icon" /></button>
                  <button className="options-btn delete-btn" onClick={() => setDeleteBook(book)} title="Supprimer"><img src={deleteIcon} alt="delete icon" /></button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
