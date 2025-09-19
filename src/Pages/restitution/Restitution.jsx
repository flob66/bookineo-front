import React, { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import ReturnModal from "../../Components/returnModal/ReturnModal";
import { getUser } from "../../utils/auth";
import { getStillRents, returnBook } from "../../http/rent";

const Restitution = () => {
  const [user] = useState(getUser());
  const [rentedBooks, setRentedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchRentedBooks = async () => {
    try {
      const data = await getStillRents();
      setRentedBooks(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des livres à restituer :", error);
      setRentedBooks([]);
    }
  };

  useEffect(() => {
    fetchRentedBooks();
  }, []);

  const handleOpenReturn = (book) => setSelectedBook(book);

  const handleConfirmReturn = async (book, returnDate, comment) => {
    try {
      if (!book || !book.id) return;
      await returnBook(user.id, book.book_id, book.id); 

      await fetchRentedBooks();
      setSelectedBook(null);
      alert("Livre restitué avec succès !");
    } catch (error) {
      console.error("Erreur lors de la restitution :", error);
      alert("Erreur lors de la restitution. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header username={user.first_name} />
      <div style={{ padding: "1rem" }}>
        <h2>Page de Restitution</h2>

        {(rentedBooks || []).length === 0 ? (
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
              {(rentedBooks || []).map((book) => {
                const startDate = new Date(book.date_start_rent);
                const returnDate = new Date(startDate);
                returnDate.setDate(returnDate.getDate() + (book.number_days_rent || 0));

                return (
                  <tr key={book.id} className="rented">
                    <td data-label="Titre">{book.title || "-"}</td>
                    <td data-label="Locataire">{book.renter_first_name + ' ' + book.renter_last_name || "-"}</td>
                    <td data-label="Date de location">{book.date_start_rent?.split("T")[0] || "-"}</td>
                    <td data-label="Date de retour">{returnDate.toISOString().split("T")[0]}</td>
                    <td data-label="Action">
                      <button
                        className="options-btn"
                        onClick={() => handleOpenReturn(book)}
                      >
                        Restituer
                      </button>
                    </td>
                  </tr>
                );
              })}
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