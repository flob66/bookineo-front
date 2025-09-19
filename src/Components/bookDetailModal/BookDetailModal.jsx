import React, { useEffect, useState } from "react";
import "./BookDetailModal.css";
import { getRents } from "../../http/rent";

const BookDetailModal = ({ book, onClose }) => {
  const [rentInfo, setRentInfo] = useState(null);

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const rents = await getRents();

        const rent = rents.find((r) => r.book_id === book.id && !r.return_date);
        if (rent) {
          setRentInfo({
            renter: `${rent.renter_first_name} ${rent.renter_last_name}`,
            rentDate: rent.date_start_rent?.split(" ")[0] || "-",
            returnDate: rent.return_date || "-",
            duration: rent.number_days_rent ? `${rent.number_days_rent} jours` : "-",
            comment: rent.comment || "-",
          });
        } else {
          setRentInfo(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de location :", error);
        setRentInfo(null);
      }
    };

    if (book) {
      fetchRent();
    }
  }, [book]);

  if (!book) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal modal-details">
        <h3>Détail du livre : {book?.title}</h3>

        <p><strong>Auteur :</strong> {book?.author}</p>
        <p><strong>Catégorie :</strong> {book?.category}</p>
        <p><strong>Propriétaire :</strong> {book?.owner}</p>
        <p><strong>ISBN :</strong> {book?.isbn}</p>
        <p><strong>Prix :</strong> {book?.price}€</p>

        <h4>Informations de location</h4>
        {rentInfo ? (
          <>
            <p><strong>Locataire :</strong> {rentInfo.renter}</p>
            <p><strong>Date de location :</strong> {rentInfo.rentDate}</p>
            <p><strong>Date de retour :</strong> {rentInfo.returnDate}</p>
            <p><strong>Durée :</strong> {rentInfo.duration}</p>
            <p><strong>Commentaire :</strong> {rentInfo.comment}</p>
          </>
        ) : (
          <p>Aucune location en cours.</p>
        )}

        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default BookDetailModal;