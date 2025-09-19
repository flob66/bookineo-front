import React, { useState } from "react";
import "./MessageTable.css";

const MessageTable = ({ messages, onRead }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleClick = (message) => {
    setSelectedMessage(message);
    if (message.seen === 0) {
      onRead(message.id);
    }
  };

  const handleKeyDown = (e, message) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      handleClick(message);
    }
  };

  return (
    <div>
      <table className="message-table">
        <thead>
          <tr>
            <th>Expéditeur</th>
            <th>Date</th>
            <th>Aperçu</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              onClick={() => handleClick(msg)}
              onKeyDown={(e) => handleKeyDown(e, msg)}
              className={msg.seen ? "read" : "unread"}
              tabIndex={0} 
              role="button" 
              aria-pressed={selectedMessage?.id === msg.id} 
            >
              <td>{msg.sender_first_name} {msg.sender_last_name}</td>
              <td>{new Date(msg.send_at).toLocaleDateString()}</td>
              <td>
                {msg.message.length > 30
                  ? msg.message.slice(0, 30) + "..."
                  : msg.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMessage && (
        <div className="message-detail">
          <h3>
            Message de {selectedMessage.sender_first_name}{" "}
            {selectedMessage.sender_last_name}
          </h3>
          <p>{selectedMessage.message}</p>
          <button onClick={() => setSelectedMessage(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default MessageTable;