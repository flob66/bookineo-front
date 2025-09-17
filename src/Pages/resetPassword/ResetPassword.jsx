import React, { useState } from "react";
import InputField from "../../Components/inputField/InputField";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setError("");
    setMessage("Votre mot de passe a été réinitialisé avec succès !");
    setForm({ password: "", confirmPassword: "" });
    window.location.href = "/login"; 

  };

  return (
    <div className="form-container form-container-reset">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Réinitialiser le mot de passe</h2>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <InputField
          label="Nouveau mot de passe"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Entrez un nouveau mot de passe"
          name="password"
        />

        <InputField
          label="Confirmer le mot de passe"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmez le mot de passe"
          name="confirmPassword"
        />

        <button type="submit" className="btn">
          Valider
        </button>

        <div className="back-to-login">
          <a href="/login">Retour à la connexion</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;