import { useState, useEffect } from "react";

function EditCommentForm(props) {
    const [comment, setComment] = useState ([]);

    useEffect(() => {
        setComment({comment_id: props.id}) 
     }, []);

    async function handleEdit(e) {
        e.preventDefault();
        window.location.reload();
        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment.comment_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            });
            return await response.json();
        } catch (error) {
            console.error("Error.");
        }
    }

    const handleChange = e => {
        setComment({...comment, [e.target.id]: e.target.value});
    }

    return (
        <div className="container">
            <form onSubmit={handleEdit}>
                <label htmlFor="comment">Edit comment</label>
                <textarea id="comment" name="comment" cols="50" rows="3" maxLength="255" onChange={handleChange}></textarea>
                <button type="submit">Save Changes</button>
            </form>
        </div>

    )
};

export default EditCommentForm;