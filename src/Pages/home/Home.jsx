import React, { useState } from "react";
import BookTable from "../../Components/bookTable/BookTable";
import Filters from "../../Components/filters/Filters";
import BookDetailModal from "../../Components/bookDetailModal/BookDetailModal";
import Header from "../../Components/header/Header";
import ActionMenu from "../../Components/actionMenu/ActionMenu";
import "./Home.css";
import addIcon from "../../assets/svg/add.svg";
import editIcon from "../../assets/svg/edit.svg"; 
import deleteIcon from "../../assets/svg/delete.svg"; 
import exportIcon from "../../assets/svg/export.svg"; 
import exportFilterIcon from "../../assets/svg/export-filter.svg"; 
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "../../Components/deleteBookModal/DeleteBookModal";

const Home = ({ books, setBooks }) => {
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    category: "",
    author: "",
    priceMin: "",
    priceMax: "",
  });

  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

  const filteredBooks = books.filter((book) => {
    if (filters.title && !book.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.status && book.status !== filters.status) return false;
    if (filters.category && book.category !== filters.category) return false;
    if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.priceMin && book.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && book.price > parseFloat(filters.priceMax)) return false;
    return true;
  });

  const handleDelete = (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
  };

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
      <div style={{ padding: "1rem 1rem" }}>
        <h2>Liste des livres</h2>
        <ActionMenu />
        <Filters filters={filters} setFilters={setFilters} books={books} />

        <div className="actions-container">
          <button onClick={() => navigate("/add-book")} title="Ajouter un livre">
            <img src={addIcon} alt="add icon" />
          </button>
          {/* <button onClick={() => alert("Modifier un livre")} title="Modifier un livre">
            <img src={editIcon} alt="edit icon" />
          </button> */}
          <button onClick={() => alert("Supprimer un livre")} title="Supprimer un livre">
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button onClick={() => exportToCSV(filteredBooks, "books-filtrés.csv")} title="Exporter CSV (filtré)">
            <img src={exportFilterIcon} alt="export with filter icon" />
          </button>
          <button onClick={() => exportToCSV(books, "books-complet.csv")} title="Exporter CSV (complet)">
            <img src={exportIcon} alt="export icon" />
          </button>
        </div>

        <BookTable books={filteredBooks} setSelectedBook={setSelectedBook} setDeleteBook={setDeleteBook} />

        {selectedBook && (
          <BookDetailModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}

        {deleteBook && (
          <DeleteBookModal
            book={deleteBook}
            onClose={() => setDeleteBook(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default Home;
