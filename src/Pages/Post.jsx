import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./Post.css"; // Add a CSS file for styling

const Post = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState(null); // Store the logged-in user

    // Fetch the logged-in user's data
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error.message);
            } else {
                setUser(data.user); // Set the logged-in user
            }
        };
        fetchUser();
    }, []);

    // Fetch the post details
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("sailing posts")
                .select("*")
                .eq("id", id)
                .single();
            if (error) console.error("Error fetching post:", error);
            else setPost(data);
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", id)
                .order("created_at", { ascending: true });
            if (error) console.error("Error fetching comments:", error);
            else setComments(data);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    // Handle adding a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("comments")
            .insert({ post_id: id, content: newComment });
        if (error) console.error("Error adding comment:", error);
        else {
            setNewComment(""); // Clear the input field
            const { data } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", id)
                .order("created_at", { ascending: true });
            setComments(data); // Refresh comments
        }
    };

    return (
        <div className="post-container">
            {/* Post Section */}
            <div className="post-details">
                {post ? (
                    <>
                        <h1 className="post-title">{post.title}</h1>
                        <p className="post-content">{post.content}</p>
                        {post.image && <img src={post.image} alt={post.title} className="post-image" />}
                    </>
                ) : (
                    <p>Loading post...</p>
                )}
            </div>

            <div className="button-container">
                <p className="likes-count">Likes: {post ? post.likes : 0}</p>
                <button
                    className="button"
                    onClick={async () => {
                        const { error } = await supabase
                            .from("sailing posts")
                            .update({ likes: post.likes + 1 })
                            .eq("id", id);
                        if (error) console.error("Error liking post:", error);
                        else setPost({ ...post, likes: post.likes + 1 }); // Update local state
                    }}
                >
                    Like
                </button>
                {user && user.id === post?.user_id && (
                    <>
                        <button
                            className="button"
                            onClick={() => (window.location.href = `/create/${id}`)}
                        >
                            Edit Post
                        </button>
                        <button
                            className="button"
                            onClick={async () => {
                                const { error } = await supabase
                                    .from("sailing posts")
                                    .delete()
                                    .eq("id", id);
                                if (error) console.error("Error deleting post:", error);
                                else window.location.href = "/"; // Redirect to home after deletion
                            }}
                        >
                            Delete Post
                        </button>
                    </>
                )}
            </div>

            {/* Comments Section */}
            <div className="interaction-section">
                <div className="comments-list">
                    <h3 className="comments-title">Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}

                    <form onSubmit={handleAddComment} className="add-comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Leave comment here..."
                            className="comment-input"
                            required
                        ></textarea>
                        <button type="submit" className="button">
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;