import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import InputField from "../../Components/inputField/InputField";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Veuillez entrer un email valide");
      return;
    }
    if (!form.firstName || !form.lastName || !form.birthDate) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setError("");
    setMessage("Informations validées ! Redirection...");

    setTimeout(() => {
      navigate("/reset-password"); 
    }, 2000);
  };

  return (
    <div className="form-container form-container-forgot">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Mot de passe oublié</h2>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Votre email"
          name="email"
        />

        <InputField
          label="Prénom"
          type="text"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Votre prénom"
          name="firstName"
        />

        <InputField
          label="Nom"
          type="text"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Votre nom"
          name="lastName"
        />

        <InputField
          label="Date de naissance"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          name="birthDate"
        />

        <button type="submit" className="btn">
          Réinitialiser le mot de passe
        </button>

        <div className="back-to-login">
          <a href="/login">Retour à la connexion</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;