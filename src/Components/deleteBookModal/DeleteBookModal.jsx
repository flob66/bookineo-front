import React from "react";
import "./DeleteBookModal.css";

const DeleteBookModal = ({ book, onClose, onDelete }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Supprimer ce livre ?</h3>
        <p>
          Êtes-vous sûr de vouloir supprimer <b>{book.title}</b> de{" "}
          <b>{book.author}</b> ?
        </p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Annuler
          </button>
          <button
            className="btn delete"
            onClick={() => {
              onDelete(book.id);
              onClose();
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
