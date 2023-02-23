import { useState, useEffect } from "react";

//New Comment form. Where people can make new comments on posts. "reply"

function CommentForm(props) {
    const [comment, setComment] = useState({
        comment: "",
        list_id: 0
    });

    useEffect(() => {
        setComment({list_id: props.id}) 
     }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            });
            await response.json();
            window.location.reload();
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = e => {
        setComment({...comment, [e.target.id]: e.target.value});
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">New Comment</label>
                <textarea id="comment" name="comment" cols="50" rows="3" maxLength="255" onChange={handleChange}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CommentForm;