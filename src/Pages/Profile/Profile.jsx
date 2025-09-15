import React, { useState } from "react";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    email: "florian@example.com",
    password: "password123",
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
    <>
      <Header username={user.firstName} />
      <div className="profile-container">
        <h2>Mon profil</h2>

        {message && <div className="success">{message}</div>}

        <InputField
          label="Adresse e-mail"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          name="email"
          disabled={!editMode}
        />

        <InputField
          label="Mot de passe"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          name="password"
          disabled={!editMode}
        />

        <InputField
          label="Prénom"
          type="text"
          value={user.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          name="firstName"
          disabled={!editMode}
        />

        <InputField
          label="Nom"
          type="text"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Nom"
          name="lastName"
          disabled={!editMode}
        />

        <InputField
          label="Date de naissance"
          type="date"
          value={user.birthDate}
          onChange={handleChange}
          name="birthDate"
          disabled={!editMode}
        />

        {!editMode ? (
          <button className="btn" onClick={() => setEditMode(true)}>
            Modifier
          </button>
        ) : (
          <button className="btn" onClick={handleSave}>
            Valider
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;
