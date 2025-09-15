import React from "react";
import "./BookDetailModal.css";

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Détail du livre : {book.title}</h3>
        <p><strong>Renter :</strong> {book.rentalInfo?.renter || "-"}</p>
        <p><strong>Date de location :</strong> {book.rentalInfo?.rentDate || "-"}</p>
        <p><strong>Date de retour :</strong> {book.rentalInfo?.returnDate || "-"}</p>
        <p><strong>Durée :</strong> {book.rentalInfo?.duration || "-"}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default BookDetailModal;
