import React, { useState } from "react";
import "./Chatbot.css";
import messageIcon from "../../assets/svg/message.svg";

const faq = {
  "Comment louer un livre ?": {
    answer: "Pour louer un livre, cliquez sur le bouton 'Louer' dans la page 'Location', puis suivez les instructions",
    keywords: ["louer", "location", "acheter"],
  },
  "Comment modifier mon profil ?": {
    answer: "Allez dans 'Profil' via le menu en haut à droite, puis cliquez sur 'Modifier'.",
    keywords: ["profil", "modifier profil", "changer profil"],
  },
  "Comment savoir si un livre est disponible ?": {
    answer: "Un livre est disponible si son statut est 'Disponible'. Sinon, il est loué.",
    keywords: ["disponible", "statut livre", "livre dispo"],
  },
  "Comment restituer un livrer ?": {
    answer: "Pour restituer un livre, cliquez sur le bouton 'Restituer' dans la page 'Restitution', puis suivez les instructions.",
    keywords: ["restituer", "rendre", "restitution"],
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour, je suis là pour vous aider !" },
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = { from: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSuggestions([]);

    const found = Object.entries(faq).find(([question, { keywords }]) =>
      keywords.some((kw) => text.toLowerCase().includes(kw))
    );

    if (found) {
      const [question, { answer }] = found;
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    } else {

      const suggested = Object.entries(faq)
        .filter(([question, { keywords }]) =>
          keywords.some((kw) => text.toLowerCase().includes(kw))
        )
        .map(([question]) => question);

      if (suggested.length > 0) {
        setSuggestions(suggested);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Désolé, je n'ai pas compris. Essayez autrement." },
        ]);
      }
    }
  };

  const handleSuggestionClick = (question) => {
    const answer = faq[question].answer;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: answer },
    ]);
    setSuggestions([]);
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

          {suggestions.length > 0 && (
            <div className="chatbot-suggestions">
              {suggestions.map((q, i) => (
                <button key={i} onClick={() => handleSuggestionClick(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            />
            <button onClick={() => handleSend(input)}>Envoyer</button>
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