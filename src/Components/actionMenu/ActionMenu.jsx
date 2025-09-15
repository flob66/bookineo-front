import React from "react";
import { Link } from "react-router-dom";
import "./ActionMenu.css";

const ActionMenu = () => {
  return (
    <div className="action-menu">
      <Link to="/location" className="action-btn">Page de Location</Link>
      <Link to="/restitution" className="action-btn">Page de Restitution</Link>
      <Link to="/historique" className="action-btn">Historique des Locations</Link>
    </div>
  );
};

export default ActionMenu;
