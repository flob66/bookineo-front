import React, { useState, useEffect } from "react";
import MessageTable from "../../Components/message-table/MessageTable";
import Header from "../../Components/header/Header";
import { getUser } from "../../utils/auth";
import NewMessage from "../../Components/newMessage/NewMessage";
import "./Messages.css";
import {
  getMessages,
  markMessageSeen,
  sendMessage
} from "../../http/messagerie";

const Messages = () => {
  const user = getUser();
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(user.id);

        const sortedMessages = data.sort(
          (a, b) => new Date(b.send_at) - new Date(a.send_at)
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [user.id]);

  const unreadCount = messages.filter((m) => m.seen === 0).length;

  const handleReadMessage = async (id) => {
    try {
      await markMessageSeen(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, seen: 1 } : m))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (receiverId, content) => {
    try {
      const newMessage = {
        sender_id: user.id,
        receiver_id: receiverId,
        content,
      };
      await sendMessage(newMessage);
      setMessages((prev) => [newMessage, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: "2rem" }}>
        <h2>Messagerie</h2>
        <p>Messages non lus : {unreadCount}</p>

        <button className="btn btn-new-message" onClick={() => setIsModalOpen(true)}>
          Nouveau message
        </button>

        <MessageTable messages={messages} onRead={handleReadMessage} />

        {isModalOpen && (
          <NewMessage
            onClose={() => setIsModalOpen(false)}
            onSend={handleSendMessage}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default Messages;
