import React from "react";
import { supabase } from "../client";
import "./signup.css"

const Signup = () => {
    const handleSignup = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error("Error signing up:", error);
        } else {
            console.log("Signed up successfully!");
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label>Email:</label>
                <input type="email" name="email" required />
                <label>Password:</label>
                <input type="password" name="password" required />
                <button type="submit">Sign Up</button>
            </form>
            <a href="/login">Already have an account? Log in</a>
        </div>
    );
}

export default Signup;