import React, { useState } from "react";
import BookTable from "../../Components/bookTable/BookTable";
import Filters from "../../Components/filters/Filters";
import BookDetailModal from "../../Components/bookDetailModal/BookDetailModal";
import Header from "../../Components/header/Header";

const Home = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      year: 1943,
      category: "Roman",
      status: "Disponible",
      price: 10,
      owner: "Florian",
      rentalInfo: {
        renter: "Alice",
        rentDate: "2025-09-10",
        returnDate: "2025-09-15",
        duration: "5 jours",
      },
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      category: "Science-fiction",
      status: "Loué",
      price: 12,
      owner: "Bob",
      rentalInfo: {
        renter: "Charlie",
        rentDate: "2025-09-12",
        returnDate: "2025-09-20",
        duration: "8 jours",
      },
    },
  ]);

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    category: "",
    author: "",
    priceMin: "",
    priceMax: "",
  });

  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter((book) => {
    if (filters.title && !book.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
    if (filters.status && book.status !== filters.status) return false;
    if (filters.category && book.category !== filters.category) return false;
    if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.priceMin && book.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && book.price > parseFloat(filters.priceMax)) return false;
    return true;
  });

  return (
    <><Header username="Florian" /><div style={{ padding: "2rem 1rem" }}>
      <h2>Liste des livres</h2>
      <Filters filters={filters} setFilters={setFilters} books={books} />
      <button
        onClick={() => alert("Ajouter un livre")}
        style={{ marginBottom: "1rem" }}
      >
        Ajouter un livre
      </button>
      <BookTable books={filteredBooks} setSelectedBook={setSelectedBook} />
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)} />
      )}
    </div></>
  );
};

export default Home;
