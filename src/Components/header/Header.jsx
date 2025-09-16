import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png"; 
import userIcon from "../../assets/user-icon.png";
import { getUser, saveUser } from "../../utils/auth"; 

const Header = () => {
  const user = getUser();

  const username = user?.first_name + ' ' + user?.last_name;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Déconnexion");
    window.location.href = "/login"; 
  };

  return (
    <header className="header">
      <Link to="/home" className="logo">
        <img src={logo} alt="Logo" />
      </Link>

      <div className="user-menu">
        <button className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={userIcon} alt="Utilisateur" className="user-icon" />
          <span>{username}</span>
        </button>

        {menuOpen && (
          <ul className="dropdown">
            <li>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <Link to="/messages">Messagerie</Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/login">Déconnexion</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;