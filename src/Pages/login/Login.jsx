import React, { useState } from "react";
import InputField from "../../Components/inputField/InputField";
import "./Login.css";
import eyeIcon from "../../assets/svg/eye-show.svg"; 
import eyeOffIcon from "../../assets/svg/eye-off.svg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }
    setError("");
    console.log("Connexion réussie !");
    window.location.href = "/home";
  };

  return (
    <div className="form-container form-container-login">
      <form className="form" onSubmit={handleLogin}>
        <h2>Se connecter</h2>

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
            <button type="button" className="input-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <img src={eyeOffIcon} alt="Eye hide icon" title="Voir" /> : <img src={eyeIcon} alt="Eye icon" title="Masquer" />}
            </button>
          }
        />

        <div className="checkbox-link">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />{" "}
            Se souvenir de moi
          </label>
          <a href="/signup">Créer un compte</a>
        </div>

        <button type="submit" className="btn">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
