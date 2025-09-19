import React, { useState } from "react";
import Header from "../../Components/header/Header";
import RentModal from "../../Components/rentModal/RentModal";
import { getUser } from "../../utils/auth";
import { getBooks } from "../../http/book";
import { rentBook } from "../../http/rent";  

const Location = ({ books, setBooks }) => {
  const [user] = useState(getUser() || {});
  const [selectedBook, setSelectedBook] = useState(null);

  const refreshBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des livres:", error);
    }
  };

  const handleRent = async (bookId, renterName, duration) => {
    try {
      await rentBook(user.id, bookId, duration); 
      alert("Livre loué avec succès !");
      await refreshBooks(); 
      setSelectedBook(null); 
    } catch (error) {
      alert("Erreur lors de la location. Veuillez réessayer.");
      console.error(error);
    }
  };

  const availableBooks = books.filter((b) => b.status === "1");

  return (
    <>
      <Header username={user.first_name} />
      <div style={{ padding: "1rem" }}>
        <h2>Page de Location</h2>
        {availableBooks.length === 0 ? (
          <p>Aucun livre disponible actuellement.</p>
        ) : (
          <table className="book-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Prix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableBooks.map((book) => (
                <tr key={book.id} className="available">
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}€</td>
                  <td>
                    <button
                      className="options-btn"
                      onClick={() => setSelectedBook(book)}
                    >
                      Louer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedBook && (
          <RentModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onConfirm={handleRent}
          />
        )}
      </div>
    </>
  );
};

export default Location;