import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const Post = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Fetch the post details
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('sailing posts')
                .select('*')
                .eq('id', id)
                .single();
            if (error) console.error("Error fetching post:", error);
            else setPost(data);
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });
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
            .from('comments')
            .insert({ post_id: id, content: newComment });
        if (error) console.error("Error adding comment:", error);
        else {
            setNewComment(""); // Clear the input field
            const { data } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });
            setComments(data); // Refresh comments
        }
    };

    return (
        <div className="post">
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt={post.title} />}
                </>
            ) : (
                <p>Loading post...</p>
            )}

            <h2>Comments</h2>
            <div className="comments">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAddComment}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a comment..."
                    required
                ></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Post;