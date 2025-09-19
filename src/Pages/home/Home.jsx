import React, { useState, useEffect } from "react";
import BookTable from "../../Components/bookTable/BookTable";
import Filters from "../../Components/filters/Filters";
import BookDetailModal from "../../Components/bookDetailModal/BookDetailModal";
import Header from "../../Components/header/Header";
import ActionMenu from "../../Components/actionMenu/ActionMenu";
import "./Home.css";
import addIcon from "../../assets/svg/add.svg";
import exportIcon from "../../assets/svg/export.svg"; 
import exportFilterIcon from "../../assets/svg/export-filter.svg"; 
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "../../Components/deleteBookModal/DeleteBookModal";
import { deleteBook, getBooks } from "../../http/book";
import {
  searchBooks,
  filterByStatus,
  filterByCategory,
  filterByAuthor,
  filterByPrice,
} from "../../http/filter";
import { getUser } from "../../utils/auth";

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

  const user = getUser();

  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBooks, setDeleteBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]); 

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data); 
      } catch (err) {
        console.error("Erreur lors de la récupération des livres :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setBooks]);

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        let data = [];

        if (filters.title) {
          data = await searchBooks(filters.title);
        } else if (filters.status) {
          data = await filterByStatus(filters.status);
        } else if (filters.category) {
          data = await filterByCategory(filters.category);
        } else if (filters.author) {
          data = await filterByAuthor(filters.author);
        } else if (filters.priceMin || filters.priceMax) {
          data = await filterByPrice(filters.priceMin, filters.priceMax);
        } else {
          data = await getBooks(); 
        }

        setFilteredBooks(data);
      } catch (err) {
        console.error("Erreur lors de l’application des filtres :", err);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [filters]);

  const handleDelete = async (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    await deleteBook(id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
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
      "Durée",
    ];

    const rows = data.map((book) => [
      book.title,
      book.author,
      book.published_date,
      book.category,
      book.status,
      book.price,
      book.owner,
      book.isbn,
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
      <Header />
      <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
        <h2>Liste des livres</h2>
        {loading && <p>Chargement des livres...</p>}
        <ActionMenu />

        <div className="actions-filters-bar">
          <div className="actions-container">
            {user?.role === 1 && (
              <button onClick={() => navigate("/add-book")} title="Ajouter un livre">
                <img src={addIcon} alt="add icon" />
              </button>
            )}
            <button
              onClick={() => exportToCSV(filteredBooks, "books-filtrés.csv")}
              title="Exporter CSV (filtré)"
            >
              <img src={exportFilterIcon} alt="export with filter icon" />
            </button>
            <button
              onClick={() => exportToCSV(books, "books-complet.csv")}
              title="Exporter CSV (complet)"
            >
              <img src={exportIcon} alt="export icon" />
            </button>
          </div>
          <Filters filters={filters} setFilters={setFilters} books={books} />
        </div>

        <BookTable
          books={filteredBooks}
          setSelectedBook={setSelectedBook}
          setDeleteBook={setDeleteBook}
        />

        {selectedBook && (
          <BookDetailModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}

        {deleteBooks && (
          <DeleteBookModal
            book={deleteBooks}
            onClose={() => setDeleteBook(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default Home;