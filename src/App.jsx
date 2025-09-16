import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      published_date: 1943,
      category: "Roman",
      status: "Disponible",
      price: 10,
      owner: "Florian",
      rentalInfo: null,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      published_date: 1949,
      category: "Science-fiction",
      status: "Loué",
      price: 12,
      owner: "Bob",
      rentalInfo: {
        renter: "Charlie",
        rentDate: "2025-09-12",
        returnDate: "2025-09-20",
        duration: "8 jours",
      },
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home books={books} setBooks={setBooks} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
        <Route path="/location" element={<Location books={books} setBooks={setBooks} />} />
        <Route path="/restitution" element={<Restitution books={books} setBooks={setBooks} />} />
        <Route path="/historique" element={<Historique books={books} />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook books={books} setBooks={setBooks} />} />
      </Routes>
    </Router>
  );
}

export default App;
