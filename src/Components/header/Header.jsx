import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png";
import { getUser, clearUser } from "../../utils/auth";

const Header = () => {
  const user = getUser();
  const username = user?.first_name + " " + user?.last_name;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    clearUser();
    window.location.href = "/login";
  };

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
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

      {}
      <nav className="breadcrumb">
        <Link to="/home">Accueil</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={to}>
              {" > "}
              {isLast ? (
                <span>{value}</span>
              ) : (
                <Link to={to}>{value}</Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

export default Header;