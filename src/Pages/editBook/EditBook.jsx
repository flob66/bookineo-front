import React, { useState, useEffect } from "react";
import "./EditBook.css";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = ({ books, setBooks }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const bookToEdit = books.find((b) => b.id === parseInt(id));

  const [book, setBook] = useState(bookToEdit || {});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!bookToEdit) {
      setMessage("Livre introuvable !");
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      setMessage("Titre et auteur sont obligatoires");
      return;
    }

    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...book } : b
    );
    setBooks(updatedBooks);

    setMessage("Livre modifié avec succès !");
    setTimeout(() => {
      setMessage("");
      navigate("/"); 
    }, 1500);
  };

  if (!bookToEdit) {
    return (
      <div style={{ padding: "2rem" }}>
        <Header username="Florian" />
        <p>{message}</p>
      </div>
    );
  }

  return (
    <>
      <Header username="Florian" />
      <div className="edit-book-container">
        <h2>Modifier le livre</h2>

        {message && <div className="success">{message}</div>}

        <form className="edit-book-form" onSubmit={handleSave}>
          <InputField
            label="Titre"
            type="text"
            value={book.title}
            onChange={handleChange}
            placeholder="Titre du livre"
            name="title"
          />
          <InputField
            label="Auteur"
            type="text"
            value={book.author}
            onChange={handleChange}
            placeholder="Nom de l'auteur"
            name="author"
          />
          <InputField
            label="Année de parution"
            type="number"
            value={book.year}
            onChange={handleChange}
            placeholder="1943"
            name="year"
          />
          <InputField
            label="Catégorie"
            type="text"
            value={book.category}
            onChange={handleChange}
            placeholder="Roman, Science-fiction..."
            name="category"
          />
          <InputField
            label="Prix (€)"
            type="number"
            value={book.price}
            onChange={handleChange}
            placeholder="10"
            name="price"
          />
          <InputField
            label="Propriétaire"
            type="text"
            value={book.owner}
            onChange={handleChange}
            placeholder="Vous ?"
            name="owner"
          />

          <button type="submit" className="btn">
            Sauvegarder
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;