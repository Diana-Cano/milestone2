import { useState, useEffect } from "react";

function EditCommentForm(props) {
    const [comment, setComment] = useState ([]);

    useEffect(() => {
        const fetchThisComment = async () => {
            const response = await (`http://localhost:3001/api/comments/${props.id}`)
            const data = await response.json();
            setComment(data);
        }
        fetchThisComment();
     }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        window.location.reload();
        try {
            const response = await fetch(`http://localhost:3001/api/comments/${comment.comment_id}`, {
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Edit comment</label>
                <textarea id="comment" name="comment" placeholder={comment.comment} cols="50" rows="3" maxLength="255" onChange={handleChange}></textarea>
                <button type="submit">Save Changes</button>
            </form>
        </div>

    )
};

export default EditCommentForm;