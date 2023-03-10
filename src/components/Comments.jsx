import { useState, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md"

function Comments(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchCommentData = async () => {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${props.id}`)
            const data = await response.json()
            setComments(data);
        }
        fetchCommentData();
    }, []);

    //deleting comments 

    let mapComments = comments.map((comment, index) => {
        const handleDelete = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment.comment_id}`, {
                    method: "DELETE"
                })
                await response.text();
                window.location.reload();
                return;
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <>
                <div className="replies" key={index}>
                    <p>{comment.comment}</p>
                    <button title="delete" onClick={handleDelete}><MdOutlineDelete /></button>
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