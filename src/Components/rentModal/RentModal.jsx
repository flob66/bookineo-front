import React, { useState } from "react";
import "./Modal.css";

const RentModal = ({ book, onClose, onConfirm }) => {
  const [renterName, setRenterName] = useState("");
  const [duration, setDuration] = useState(7);

  const handleConfirm = () => {
    if (!renterName) {
      alert("Veuillez saisir le nom du locataire.");
      return;
    }
    onConfirm(book.id, renterName, duration);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Louer : {book.title}</h3>
        <label>
          Nom et prénom du locataire :
          <input
            type="text"
            value={renterName}
            onChange={(e) => setRenterName(e.target.value)}
            placeholder="Ex: Jean Dupont"
          />
        </label>
        <label>
          Durée prévue (jours) :
          <input
            type="number"
            value={duration}
            min={1}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleConfirm} className="confirm-btn">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentModal;
