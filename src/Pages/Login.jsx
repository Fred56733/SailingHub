import React, { useEffect } from "react";
import { supabase } from "../client";
import "./Login.css";

const Login = () => {
    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error.message);
            } else if (data.user) {
                window.location.href = "/profile"; // Redirect to profile page if logged in
            }
        };
        checkUser();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error("Error logging in:", error.message);
            alert(error.message); // Show error message to the user
        } else {
            console.log("Logged in successfully!");
            window.location.href = "/profile"; // Redirect to profile page
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" name="email" required />
                <label>Password:</label>
                <input type="password" name="password" required />
                <button type="submit">Login</button>
            </form>
            <a href="/signup">Don't have an account? Sign up</a>
        </div>
    );
};

export default Login;