import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src="/src/assets/logo.png" alt="Logo" className="navbar-logo" />
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li>
                    <Link to="/create" className="navbar-link">Create</Link>
                </li>
                <li>
                    <Link to="/login" className="navbar-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;