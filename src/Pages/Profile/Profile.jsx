import React, { useState } from "react";
import InputField from "../../Components/inputField/InputField";
import "./Profile.css";
import Header from "../../Components/header/Header";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "Florian",
    lastName: "Bar",
    birthDate: "1990-01-01",
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    setMessage("Profil mis à jour avec succès !");

    setTimeout(() => setMessage(""), 3000); 
  };

  return (
    <><Header username="Florian" /><div className="profile-container">
          <h2>Mon profil</h2>

          {message && <div className="success">{message}</div>}

          <InputField
              label="Prénom"
              type="text"
              value={user.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              name="firstName"
              disabled={!editMode} />

          <InputField
              label="Nom"
              type="text"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Nom"
              name="lastName"
              disabled={!editMode} />

          <InputField
              label="Date de naissance"
              type="date"
              value={user.birthDate}
              onChange={handleChange}
              name="birthDate"
              disabled={!editMode} />

          {!editMode ? (
              <button className="btn" onClick={() => setEditMode(true)}>
                  Modifier
              </button>
          ) : (
              <button className="btn" onClick={handleSave}>
                  Valider
              </button>
          )}
      </div></>
  );
};

export default Profile;