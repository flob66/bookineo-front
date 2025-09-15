import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import Home from "./Pages/home/Home";
import Profile from "./Pages/Profile/Profile";
import Messages from "./Pages/messagerie/Messages";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Login />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
