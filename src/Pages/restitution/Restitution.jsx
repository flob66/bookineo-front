import React, { useState } from "react";
import Header from "../../Components/header/Header";

const Restitution = ({ books, setBooks }) => {
   const [user, setUser] = useState({
      email: "florian@example.com",
      password: "password123",
      firstName: "Florian",
      lastName: "Bar",
      birthDate: "1990-01-01",
    });

  const rentedBooks = books.filter((b) => b.status === "Loué");

  const handleReturn = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, status: "Disponible", rentalInfo: null }
          : b
      )
    );
  };

  return (
    <><Header username={user.firstName} /><div style={{ padding: "1rem" }}>
      <h2>Page de Restitution</h2>
      {rentedBooks.length === 0 ? (
        <p>Aucun livre loué actuellement.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Locataire</th>
              <th>Date de retour prévue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rentedBooks.map((book) => (
              <tr key={book.id} className="rented">
                <td data-label="Titre">{book.title}</td>
                <td data-label="Locataire">{book.rentalInfo.renter}</td>
                <td data-label="Date de retour">{book.rentalInfo.returnDate}</td>
                <td>
                  <button onClick={() => handleReturn(book.id)}>
                    Restituer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div></>
  );
};

export default Restitution;
