import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // Use the useNavigate hook to programmatically navigate

    // Fetch data from Supabase
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('sailing posts')
                .select('*')
                .order('created_at', { ascending: false }); // Order by created_at in descending order
            if (error) console.error("Error fetching data:", error);
            else setPosts(data); // Set the fetched data to state
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
                <div key={post.id} className="posts-card"  onClick={() => navigate(`/post/${post.id}`)}>
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