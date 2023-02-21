import { useState, useEffect } from "react";
import{ MdOutlineDelete } from "react-icons/md"

function Comments(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchCommentData = async () => {
            const response = await fetch(`http://localhost:3001/api/comments/${props.id}`)
            const data = await response.json()
            setComments(data);
        }
        fetchCommentData();
    }, []);

//deleting comments 

    let mapComments = comments.map((comment, index) => {
        const handleDelete = () => {
            window.location.reload();
            fetch(`http://localhost:3001/api/comments/${comment.comment_id}`, {
                method: "DELETE"
            })
            .then(res => res.json());
        }

        return (
            <>
                <div className="replies" key={index}>
                    <p>{comment.comment}</p>
                    <button id="delete" title="delete" onClick={handleDelete}><MdOutlineDelete/></button>
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