import React, { useState } from "react";
import InputField from "../../Components/inputField/InputField";
import "./Login.css";
import eyeIcon from "../../assets/svg/eye-show.svg"; 
import eyeOffIcon from "../../assets/svg/eye-off.svg"; 
import { login } from "../../http/user";
import { saveUser } from "../../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }
    setError("");

    try {
      const data = await login(email, password);

      if (!data?.user) {
        setError("Identifiants incorrects");
        return;
      }

      saveUser({
        ...data.user,
        createdAt: Date.now(), 
      });

      window.location.href = "/home";
    } catch (error) {
      setError("Erreur lors de la connexion");
    }
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
            <button
              type="button"
              className="input-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={eyeOffIcon} alt="Eye hide icon" title="Voir" />
              ) : (
                <img src={eyeIcon} alt="Eye icon" title="Masquer" />
              )}
            </button>
          }
        />

        <div className="forgot-password">
          <a href="/forgot-password">Mot de passe oublié ?</a>
        </div>

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