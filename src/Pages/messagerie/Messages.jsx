import React, { useState } from "react";
import MessageTable from "../../Components/message-table/MessageTable";
import Header from "../../Components/header/Header";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice",
      date: "2025-09-15",
      preview: "Bonjour Florian, je voulais te parler de...",
      content: "Bonjour Florian, je voulais te parler de la réunion de demain à 14h...",
      read: false,
    },
    {
      id: 2,
      sender: "Bob",
      date: "2025-09-14",
      preview: "Salut, le projet avance bien...",
      content: "Salut, le projet avance bien. On devrait finir cette semaine.",
      read: true,
    },
    {
      id: 3,
      sender: "Charlie",
      date: "2025-09-13",
      preview: "Rappel pour la conférence...",
      content: "Rappel pour la conférence demain à 10h dans l'amphi principal.",
      read: false,
    },
  ]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleReadMessage = (id) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              read: true,
            }
          : m
      )
    );
  };

  return (
    <><Header username="Florian" /><div style={{ padding: "2rem" }}>
      <h2>Messagerie</h2>
      <p>Messages non lus : {unreadCount}</p>
      <MessageTable messages={messages} onRead={handleReadMessage} />
    </div></>
  );
};

export default Messages;
