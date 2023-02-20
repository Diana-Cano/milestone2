import { useState, useEffect } from "react";
import EditCommentForm from "./EditCommentForm";

function Comments(props) {
    const [comments, setComments] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchCommentData = async () => {
            const response = await fetch(`http://localhost:3001/api/comments/list/${props.id}`)
            const data = await response.json()
            setComments(data);
        }
        fetchCommentData();
    }, []);

    let mapComments = comments.map((comment, index) => {
        const handleDelete = () => {
            window.location.reload();
            fetch(`http://localhost:3001/api/comments/${comment.comment_id}`, {
                method: "DELETE"
            })
            .then(res => res.json());
        }

        const handleEdit = () => {
            
        }

        return (
            <>
                <div className="container" key={index}>
                    <p>{comment.comment}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
           </>
        )
    });

    return (
        <div>
            {mapComments}
        </div>
    )
}

export default Comments;