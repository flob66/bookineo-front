import React, { useState, useEffect } from "react";
import "./EditBook.css";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook } from "../../http/book";

const EditBook = ({ books, setBooks }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const bookToEdit = books.find((b) => b.id === parseInt(id));

  const [book, setBook] = useState(bookToEdit || {});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookToEdit) {
      setMessage("Livre introuvable !");
    } else {
      setBook(bookToEdit);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
    setBook((prev) => ({ ...prev, [name]: newValue }));
  };


  const handleSave = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      setError("Titre et auteur sont obligatoires");
      return;
    }

    try {

      const updatedBook = { ...book, status: book.status.toString() };

      const data = await updateBook(updatedBook);

      const updatedBooks = books.map((b) => (b.id === book.id ? updatedBook : b));
      setBooks(updatedBooks);

      setMessage("Livre modifié avec succès !");
      setError("");
      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la modification du livre");
    }
  };

  if (!bookToEdit) {
    return (
      <div style={{ padding: "2rem" }}>
        <Header />
        <p>{message}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="edit-book-container">
        <h2>Modifier le livre : <span className="book-title-container">{book.title || ""}</span></h2>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <form className="edit-book-form" onSubmit={handleSave}>
          <InputField
            label="Titre"
            type="text"
            value={book.title || ""}
            onChange={handleChange}
            placeholder="Titre du livre"
            name="title"
          />
          <InputField
            label="Auteur"
            type="text"
            value={book.author || ""}
            onChange={handleChange}
            placeholder="Nom de l'auteur"
            name="author"
          />
          <InputField
            label="Année de parution"
            type="date"
            value={book.published_date ? book.published_date.split(" ")[0] : ""}
            onChange={handleChange}
            name="published_date"
          />
          <InputField
            label="Catégorie"
            type="text"
            value={book.category || ""}
            onChange={handleChange}
            name="category"
          />
          <InputField
            label="Prix (€)"
            type="number"
            value={book.price || ""}
            onChange={handleChange}
            name="price"
          />
          <InputField
            label="Propriétaire"
            type="text"
            value={book.owner || ""}
            onChange={handleChange}
            name="owner"
          />
          <InputField
            label="ISBN"
            type="text"
            value={book.isbn || ""}
            onChange={handleChange}
            name="isbn"
          />
          <label className="checkbox-field">
            <input
              type="checkbox"
              name="status"
              checked={book.status === "1"}
              onChange={handleChange}
            />
            Loué ?
          </label>


          <button type="submit" className="btn">
            Sauvegarder
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;