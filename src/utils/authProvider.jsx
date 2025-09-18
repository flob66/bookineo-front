import React, { createContext, useEffect, useState } from "react";
import { getUser, clearUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const INACTIVITY_LIMIT = 3 * 60 * 10000; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_LIMIT);
    };

    const handleActivity = () => resetTimer();

    const handleLogout = () => {
      clearUser();
      setUser(null);
      navigate("/login");
    };

    if (user) {

      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("click", handleActivity);
      window.addEventListener("keypress", handleActivity);
      window.addEventListener("scroll", handleActivity);

      resetTimer();
    }

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      if (timer) clearTimeout(timer);
    };
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;