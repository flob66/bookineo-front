import React, { useState } from "react";
import InputField from "../../Components/InputField";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email invalide");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Mot de passe : 8 caractères, une majuscule, une minuscule et un caractère spécial"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Mot de passe et confirmation différents");
      return;
    }
    setError("");
    console.log("Compte créé !");
    window.location.href = "/login";
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSignup}>
        <h2>Créer un compte</h2>

        {error && <div className="error">{error}</div>}

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
        />

        <InputField
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
          icon={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Masquer" : "Voir"}
            </span>
          }
        />

        <InputField
          label="Confirmer le mot de passe"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez le mot de passe"
          icon={
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "Masquer" : "Voir"}
            </span>
          }
        />

        <button type="submit" className="btn">
          Créer le compte
        </button>

        <a href="/login">Déjà un compte ? Se connecter</a>
      </form>
    </div>
  );
};

export default Signup;
