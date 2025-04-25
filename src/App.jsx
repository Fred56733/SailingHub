import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Post from './Pages/Post';
import Login from './Pages/Login'; 
import Signup from './Pages/Signup';
import './App.css';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} /> {/* Home page */}
              <Route path="/create" element={<Create />} /> { /* For creating new crewmates */}
              <Route path="/create/:id" element={<Create />} /> {/* For editing */}
              <Route path="/Post/:id" element={<Post />} /> {/* For viewing posts */}
              <Route path="/Login" element={<Login />} /> {/* For login */}
              <Route path="/Signup" element={<Signup />} /> {/* For signup */}
          </Routes>
      </Router>
  );
}


export default App
