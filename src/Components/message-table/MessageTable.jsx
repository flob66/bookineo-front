import React, { useState } from "react";
import "./MessageTable.css";

const MessageTable = ({ messages, onRead }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      onRead(message.id);
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
              className={msg.read ? "read" : "unread"}
            >
              <td>{msg.sender}</td>
              <td>{msg.date}</td>
              <td>{msg.preview}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMessage && (
        <div className="message-detail">
          <h3>Message de {selectedMessage.sender}</h3>
          <p>{selectedMessage.content}</p>
          <button onClick={() => setSelectedMessage(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default MessageTable;
