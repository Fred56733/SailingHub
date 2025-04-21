import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    // Fetch data from Supabase
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('sailing posts')
                .select('*');
            if (error) console.error("Error fetching data:", error);
            else {
               console.log("Fetched data:", data); 
                setPosts(data); // Set the fetched data to state
            } 
        };
        fetchData();
    }, []);
        

    return (
        <div className="home">
        <h1>Welcome to Sailing Hub</h1>
        <p>Explore and create your own unique posts to others in the sailing community!</p>
        <p>Use the navigation bar at the top of the page to get started.</p>
        <div className="posts-grid">
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    {post.image && <img src={post.image} alt={""} className="posts-card-img" />}
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Home;