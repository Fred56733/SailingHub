import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Post from './Pages/Post';
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
          </Routes>
      </Router>
  );
}


export default App
