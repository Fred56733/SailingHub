import React, { useState } from "react";
import { supabase } from "../client";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) {
            console.error("Error logging in:", error);
        } else {
            console.log("Logged in successfully!");
            window.location.href = "/"; // Redirect to home page
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <a href="/signup">Don't have an account? Sign up</a>
        </div>
    );
};

export default Login;