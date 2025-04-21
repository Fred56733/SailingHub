import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Gallery from './Pages/Gallery';
import './App.css';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} /> {/* Home page */}
              <Route path="/create" element={<Create />} /> { /* For creating new crewmates */}
              <Route path="/create/:id" element={<Create />} /> {/* For editing */}
              <Route path="/gallery" element={<Gallery />} /> {/* Crewmate display page */}
          </Routes>
      </Router>
  );
}


export default App
