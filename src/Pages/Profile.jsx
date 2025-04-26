import React, { useState, useEffect } from "react";
import { supabase } from "../client";

const Profile = () => {
    const [user, setUser] = useState(null);

    // Fetch the logged-in user's data
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error.message);
            } else {
                setUser(data.user); // Set the user data
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            console.log("Logged out successfully!");
            window.location.href = "/login"; // Redirect to login page
        }
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;