import React, { useState } from "react";
import Header from "../../Components/header/Header";
import InputField from "../../Components/inputField/InputField";
import "./Profile.css";
import { getUser, saveUser } from "../../utils/auth";
import { updateUser } from "../../http/user";

const Profile = () => {
  const [user, setUser] = useState(
    getUser() || {
      email: "",
      first_name: "",
      last_name: "",
      birthday: "",
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    if (!user.email.includes("@") || !/\S+@\S+\.\S+/.test(user.email)) {
      setError("Adresse e-mail invalide");
      return;
    }
    setError("");

    try {
      await updateUser(user.first_name, user.last_name, user.birthday, user.email, user.id);
      saveUser(user);
      setEditMode(false);
      setMessage("Profil mis à jour avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <>
      <Header username={user.first_name} />
      <div className="profile-container">
        <h2>Mon profil</h2>

        {}
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

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