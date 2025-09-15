import React, { useState } from "react";
import InputField from "../../Components/InputField";
import "./Login.css";

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
    <div className="form-container">
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
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Masquer" : "Voir"}
            </span>
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
