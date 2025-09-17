import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import Home from "./Pages/home/Home";
import Profile from "./Pages/Profile/Profile";
import Messages from "./Pages/messagerie/Messages";
import Location from "./Pages/location/Location";
import Restitution from "./Pages/restitution/Restitution";
import Historique from "./Pages/historique/Historique";
import AddBook from "./Pages/addBook/AddBook";
import EditBook from "./Pages/editBook/EditBook";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import ResetPassword from "./Pages/resetPassword/ResetPassword";
import { getUser } from "./utils/auth";
import { getBooks } from "./http/book";
import Chatbot from "./Components/chatbot/Chatbot";

const PrivateRoute = ({ children }) => {
  const user = getUser();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const user = getUser();
  return !user ? children : <Navigate to="/home" replace />;
};

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des livres :", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Router>
      <Chatbot />
      <Routes>
        {}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {}
        <Route path="/home" element={<PrivateRoute><Home books={books} setBooks={setBooks} /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path="/location" element={<PrivateRoute><Location books={books} setBooks={setBooks} /></PrivateRoute>} />
        <Route path="/restitution" element={<PrivateRoute><Restitution books={books} setBooks={setBooks} /></PrivateRoute>} />
        <Route path="/historique" element={<PrivateRoute><Historique books={books} /></PrivateRoute>} />
        <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/edit-book/:id" element={<PrivateRoute><EditBook books={books} setBooks={setBooks} /></PrivateRoute>} />

        {}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;