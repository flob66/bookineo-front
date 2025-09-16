import React, { useState } from "react";
import "./AddBook.css";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    price: "",
    owner: "", 
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Livre ajouté :", book);
    setMessage("Livre ajouté avec succès !");
    setTimeout(() => setMessage(""), 3000);
    setBook({ title: "", author: "", year: "", category: "", price: "", owner: "" });
  };

  return (
    <>
      <Header username="Florian" />
      <div className="add-book-container">
        <h2>Ajouter un livre</h2>

        {message && <div className="success">{message}</div>}

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
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;