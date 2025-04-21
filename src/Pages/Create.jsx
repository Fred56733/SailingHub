import React from "react";
import './Create.css'; 

const Create = () => {
    return (
        <div className="create">
            <h1>Create a New Post</h1>
            <form>
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