import React, { useState } from "react";
import "./NewMessage.css";
import { sendMessage } from "../../http/messagerie";

const NewMessage = ({ onClose, onSend, user }) => {
  const [recipient, setRecipient] = useState(""); 
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipient || !content) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setError("");
    setLoading(true);

    try {

      await sendMessage({
        senderId: user.id,
        receiver_email: recipient,
        content,
      });

      onSend({
        id: Date.now(), 
        sender_id: user.id,
        receiver_email: recipient,
        message: content,
        seen: 0,
        send_at: new Date().toISOString(),
        sender_first_name: user.firstName,
        sender_last_name: user.lastName,
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Nouveau message</h3>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="message-form">
          <label className="label">
            De :
              <input type="email" value={user?.email || ""} disabled />
          </label>

          <label>
            À :
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Email du destinataire"
              required
            />
          </label>

          <label>
            Message :
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrivez votre message..."
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn cancel">
              Annuler
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMessage;