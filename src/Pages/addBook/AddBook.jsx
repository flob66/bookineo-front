import React, { useState } from "react";
import "./AddBook.css";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import { addBook } from "../../http/book";

const AddBook = () => {
  const [error, setError] = useState("");
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_date: "",
    status: "1", 
    category: "",
    price: "",
    owner: "", 
    isbn: "", 
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
    setBook({ ...book, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await addBook(book); 
      setMessage("Livre ajouté avec succès !");
      setBook({
        title: "",
        author: "",
        published_date: "",
        status: "1", 
        category: "",
        price: "",
        owner: "",
        isbn: "",
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Erreur lors de l'ajout du livre");
    }
  };

  return (
    <>
      <Header />
      <div className="add-book-container">
        <h2>Ajouter un livre</h2>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <form className="add-book-form" onSubmit={handleSubmit}>
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
            type="date"
            value={book.published_date}
            onChange={handleChange}
            name="published_date"
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
          <InputField
            label="ISBN"
            type="number"
            value={book.isbn}
            onChange={handleChange}
            placeholder="1"
            name="isbn"
          />

          {}
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={book.status === "1"}
              onChange={handleChange}
              name="status"
            />
            Disponible ?
          </label>

          <button type="submit" className="btn">
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;