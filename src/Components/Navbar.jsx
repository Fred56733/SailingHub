import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);

    // Check if user is logged in and listen for auth state changes
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error.message);
                return;
            }
            if (session) {
                setUser(session.user); // Set the user if a session exists
            }
        };

        fetchUser();

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user); // User is logged in
            } else {
                setUser(null); // User is logged out
            }
        });

        // Cleanup the subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <nav className="navbar">
            <img src="/src/assets/SailingHub logo.png" alt="Logo" className="navbar-logo" />
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li>
                    <Link to="/create" className="navbar-link">Create</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;