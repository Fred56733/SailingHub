import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Create.css'; 
import { supabase } from "../client";

const Create = () => {
    const { id } = useParams(); // Get the post ID from the URL parameters
    const [post, setPost] = useState({ title:"", content:"", image:"" }); // Initialize state for the post title

    // Fetch the post data if an ID is provided
    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const { data, error } = await supabase
                    .from('sailing posts')
                    .select('*')
                    .eq('id', id)
                    .single(); // Fetch a single post by ID
                if (error) console.error("Error fetching post:", error);
                else setPost(data); // Set the fetched post data to state
            }
        };
        fetchPost();
    }, [id]); // Run this effect only when the ID changes

    // Handle inut changes 
    const handleChange = (event) => {
        const { name, value } = event.target; // Destructure the name and value from the event target
        setPost((prevPost) => ({ ...prevPost, [name]: value })); // Update the post state with the new value
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (id) {
            // If an ID is provided, update the existing post
            const { error } = await supabase
                .from('sailing posts')
                .update({
                    title: post.title, 
                    content: post.content, 
                    image: post.image 
                })
                .eq('id', id); // Update the post with the provided ID

            if (error) {
                console.error("Error updating data:", error);
            } else {
                console.log("Post updated successfully!");
                // Redirect to the post page after updating
                window.location.href = `/`; // Redirect to the updated post page
            }
        } else {
            // If no ID is provided, create a new post
            const { error } = await supabase
                .from('sailing posts')
                .insert({
                    title: post.title, 
                    content: post.content, 
                    image: post.image 
                });

            if (error) {
                console.error("Error inserting data:", error);
            } else {
                console.log("Post created successfully!");
            }
        }
    }

    return (
        <div className="create">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} required />

                {/* Post Content Field */}
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" value={post.content} onChange={handleChange} required></textarea>
            
                {/* Image URL Field */} 
                <label htmlFor="image">Image URL:</label>
                <input type="url" id="image" name="image" value={post.image} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Create;