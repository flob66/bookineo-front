import React, { useEffect, useState } from "react";
import "../rentModal/Modal.css";

const ReturnModal = ({ book, onClose, onConfirm }) => {
  const [returnDate, setReturnDate] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setReturnDate(new Date().toISOString().split("T")[0]);
    setComment("");
  }, [book]);

  if (!book) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!returnDate) {
      alert("Veuillez saisir une date de retour.");
      return;
    }
    setLoading(true);
    try {
      await onConfirm(book, returnDate, comment); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Restituer : {book.title}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Date de retour
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
          <label className="comment-container">
            Commentaire (facultatif)
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ex: état du livre, notes..."
              rows={3}
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn confirm-btn" disabled={loading}>
              {loading ? "En cours..." : "Confirmer la restitution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;