import React, { useState } from "react";
import "./Modal.css";
import { getUser } from "../../utils/auth";

const RentModal = ({ book, onClose, onConfirm }) => {
  const user = getUser();
  const [duration, setDuration] = useState(7);

  const renterName = `${user.first_name} ${user.last_name}`;

  const handleConfirm = () => {
    if (!renterName.trim()) {
      alert("Nom du locataire introuvable.");
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
          <input type="text" value={renterName} disabled />
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
