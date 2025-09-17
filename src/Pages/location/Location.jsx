import React, { useState } from "react";
import Header from "../../Components/header/Header";
import RentModal from "../../Components/rentModal/RentModal";
import { getUser, saveUser } from "../../utils/auth";


const Location = ({ books, setBooks }) => {
  const [user, setUser] = useState(
    getUser() || {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    }
  );

  const [selectedBook, setSelectedBook] = useState(null);

  const handleRent = (bookId, renterName, duration) => {
    const startDate = new Date().toISOString().split("T")[0];
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + parseInt(duration));

    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: "Loué",
              rentalInfo: {
                renter: renterName,
                rentDate: startDate,
                returnDate: returnDate.toISOString().split("T")[0],
                duration: `${duration} jours`,
              },
            }
          : b
      )
    );
    setSelectedBook(null);
  };

  const availableBooks = books.filter((b) => b.status === "1");

  return (
    <><Header username={user.firstName} /><div style={{ padding: "1rem" }}>
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
                <td data-label="Titre">{book.title}</td>
                <td data-label="Auteur">{book.author}</td>
                <td data-label="Prix">{book.price}€</td>
                <td>
                  <button className="options-btn" onClick={() => setSelectedBook(book)}>Louer</button>
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
          onConfirm={handleRent} />
      )}
    </div></>
  );
};

export default Location;
