import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]); // Original list of posts
    const [filteredPosts, setFilteredPosts] = useState([]); // Filtered list of posts
    const navigate = useNavigate();

    // Fetch data from Supabase
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('sailing posts')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) console.error("Error fetching data:", error);
            else {
                setPosts(data); // Set the original list of posts
                setFilteredPosts(data); // Initialize the filtered list with all posts
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") {
            setFilteredPosts(posts); // Reset to the original list when the search input is cleared
        } else {
            setFilteredPosts(
                posts.filter((post) =>
                    post.title.toLowerCase().includes(searchTerm) // Only filter by title
                )
            );
        }
    };

    function timeSincePost(postedTimeString) {
        const postedDate = new Date(postedTimeString);
        const now = new Date();

        const secondsAgo = Math.floor((now - postedDate) / 1000);
        const minutesAgo = Math.floor(secondsAgo / 60);
        const hoursAgo = Math.floor(minutesAgo / 60);
        const daysAgo = Math.floor(hoursAgo / 24);
        const yearsAgo = Math.floor(daysAgo / 365);

        if (hoursAgo < 24) {
            return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
        } else if (daysAgo < 365) {
            return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
        } else {
            return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
        }
    }

    return (
        <div className="home">
            <h1>Welcome to Sailing Hub</h1>
            <p>Explore and create your own unique posts to others in the sailing community!</p>
            <p>Use the navigation bar at the top of the page to get started.</p>
            <div className="sorting-buttons">
                <button onClick={() => setPosts([...posts].sort((a, b) => b.likes - a.likes))}>                    Sort by Likes                </button>
                <button onClick={() => setPosts([...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))}>                    Sort by Date                </button>
                <input type="text" placeholder="Search..." onChange={handleSearch}/>
            </div>
            <div className="posts-grid">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="posts-card" onClick={() => navigate(`/post/${post.id}`)}>
                        <p>{timeSincePost(post.created_at)}</p>
                        {post.image && <img src={post.image} alt={""} className="posts-card-img" />}
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>{"Likes: " + post.likes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;