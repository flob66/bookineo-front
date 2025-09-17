import React, { useState } from "react";
import "./Chatbot.css";
import messageIcon from "../../assets/svg/message.svg";

const faq = {
  "comment louer un livre": "Pour louer un livre, cliquez sur le bouton 'Louer' dans la page 'Location'.",
  "comment modifier mon profil": "Allez dans 'Profil' via le menu en haut à droite, puis cliquez sur 'Modifier'.",
  "comment savoir si un livre est disponible": "Un livre est disponible si son statut est 'Disponible'. Sinon, il est loué.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour, je suis là pour vous aider !" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const key = input.toLowerCase().trim();
    const botAnswer =
      Object.keys(faq).find((q) => key.includes(q)) ||
      "Désolé, je n'ai pas compris. Essayez autrement.";

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: faq[botAnswer] || botAnswer },
    ]);

    setInput("");
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">FAQ Chatbot</div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Envoyer</button>
          </div>
        </div>
      )}
      <button type="button" className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img className="message-icon" src={messageIcon} alt="message icon" />
      </button>
    </div>
  );
};

export default Chatbot;