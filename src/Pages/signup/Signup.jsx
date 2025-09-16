import React, { useState } from "react";
import InputField from "../../Components/inputField/InputField";
import "./Signup.css";
import eyeIcon from "../../assets/svg/eye-show.svg"; 
import eyeOffIcon from "../../assets/svg/eye-off.svg"; 


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
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
    if (!firstName || !lastName || !birthDate) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    setError("");
    console.log("Compte créé !", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
    });

    window.location.href = "/login";
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSignup}>
        <h2>Créer un compte</h2>

        {error && <div className="error">{error}</div>}

        <InputField
          label="Prénom"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Votre prénom"
        />

        <InputField
          label="Nom"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Votre nom"
        />

        <InputField
          label="Date de naissance"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

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
            <button type="button"
              className="password-toggle input-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img src={eyeOffIcon} alt="Eye hide icon" title="Voir" /> : <img src={eyeIcon} alt="Eye icon" title="Masquer" />}
            </button>
          }
        />

        <InputField
          label="Confirmer le mot de passe"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez le mot de passe"
          icon={
            <button type="button"
              className="password-toggle input-button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <img src={eyeOffIcon} alt="Eye hide icon" title="Voir" /> : <img src={eyeIcon} alt="Eye icon" title="Masquer" />}
            </button>
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
