import React, { useState } from "react";
import Header from "../../Components/header/Header";
import ReturnModal from "../../Components/returnModal/ReturnModal";
// import "./Restitution.css"; 

const Restitution = ({ books, setBooks }) => {
  const [user] = useState({
    email: "florian@example.com",
    password: "password123",
    firstName: "Florian",
    lastName: "Bar",
    birthDate: "1990-01-01",
  });

  const [selectedBook, setSelectedBook] = useState(null);

  const rentedBooks = (books || []).filter((b) => b.status === "Loué");

  const handleOpenReturn = (book) => {
    setSelectedBook(book);
  };

  const handleConfirmReturn = (bookId, returnDate, comment) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== bookId) return b;

        const prevRental = b.rentalInfo || {};
        const historyEntry = {
          renter: prevRental.renter || "",
          rentDate: prevRental.rentDate || "",
          returnDate: returnDate,
          duration: prevRental.duration || "",
          comment: comment || "",
        };

        return {
          ...b,
          status: "Disponible",            
          rentalInfo: null,                
          history: [...(b.history || []), historyEntry], 
        };
      })
    );
    setSelectedBook(null);
  };

  return (
    <>
      <Header username={user.firstName} />
      <div style={{ padding: "1rem" }}>
        <h2>Page de Restitution</h2>

        {rentedBooks.length === 0 ? (
          <p>Aucun livre loué actuellement.</p>
        ) : (
          <table className="book-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Locataire</th>
                <th>Date de location</th>
                <th>Date de retour prévue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rentedBooks.map((book) => (
                <tr key={book.id} className="rented">
                  <td data-label="Titre">{book.title}</td>
                  <td data-label="Locataire">{book.rentalInfo?.renter || "-"}</td>
                  <td data-label="Date de location">{book.rentalInfo?.rentDate || "-"}</td>
                  <td data-label="Date de retour">{book.rentalInfo?.returnDate || "-"}</td>
                  <td data-label="Action">
                    <button onClick={() => handleOpenReturn(book)}>Restituer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedBook && (
          <ReturnModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onConfirm={handleConfirmReturn}
          />
        )}
      </div>
    </>
  );
};

export default Restitution;