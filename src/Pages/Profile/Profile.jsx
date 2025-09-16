import React, { useState } from "react";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import "./Profile.css";
import { getUser, saveUser } from "../../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(
    getUser() || {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveUser(user); 
    setEditMode(false);
    setMessage("Profil mis à jour avec succès !");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <Header username={user.first_name} />
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
          value={user.first_name}
          onChange={handleChange}
          placeholder="Prénom"
          name="first_name"
          disabled={!editMode}
        />

        <InputField
          label="Nom"
          type="text"
          value={user.last_name}
          onChange={handleChange}
          placeholder="Nom"
          name="last_name"
          disabled={!editMode}
        />

        <InputField
          label="Date de naissance"
          type="date"
          value={user.birthday}
          onChange={handleChange}
          name="birthday"
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
