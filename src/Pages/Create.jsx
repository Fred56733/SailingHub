import React, { useState, useEffect } from "react";
import './Create.css'; 
import { supabase } from "../client";

const Create = () => {
    
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const {error} = await supabase
            .from('sailing posts')
            .insert({
                title: event.target.title.value, 
                content: event.target.content.value, 
                image: event.target.image.value 
            });

        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Post created successfully!");
        }
    }

    return (
        <div className="create">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required />

                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" required></textarea>

                <label htmlFor="image">Image URL:</label>
                <input type="url" id="image" name="image" />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Create;