import React from "react";
import "./InputField.css";

const InputField = ({ label, type, value, onChange, placeholder, icon }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
        {icon && <div className="input-icon">{icon}</div>}
      </div>
    </div>
  );
};

export default InputField;
