import { useState, useEffect } from "react";

function CommentForm(props) {
    const [comment, setComment] = useState({
        comment: "",
        list_id: 0
    });

    useEffect(() => {
        setComment({list_id: props.id});
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        });
        await response.text();

        props.setReply(false);
        props.setComments([]);
        props.fetchComments();
    }

    const handleChange = e => {
        setComment({...comment, [e.target.id]: e.target.value});
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">New Comment</label>
            <textarea id="comment" maxLength="255" onChange={handleChange}></textarea>
            <button>Submit</button>
        </form>
    )
}

export default CommentForm;