import React, { useState } from "react";
import "./Chatbot.css";
import messageIcon from "../../assets/svg/message.svg";
import { askBot } from "../../http/llm";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour, je suis là pour vous aider !" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await askBot(input);
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Erreur de connexion au chatbot." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Chatbot</div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="message bot">...</div>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              Envoyer
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img className="message-icon" src={messageIcon} alt="message icon" />
      </button>
    </div>
  );
};

export default Chatbot;
