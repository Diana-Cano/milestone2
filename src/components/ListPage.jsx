import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditListItem from "./EditListItem";
import CommentForm from "./CommentForm";
import { BsReply } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

function ListPage() {
    const [reply, setReply] = useState(false);
    const [edit, setEdit] = useState(false);
    const [list, setList] = useState({});
    const [comments, setComments] = useState([]);

    const { name, id } = useParams();

    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${id}`, {
            method: "DELETE"
        });
        await response.text();
        navigate(`/${name}`);
    }

    const fetchList = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${id}`);
        const data = await response.json();
        setList(data);
    }

    const fetchComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${id}`);
        const data = await response.json();
        setComments(data);
    }

    useEffect(() => {
        fetchList();
        fetchComments();
    }, []);

    let mapComments = comments.map((comment, index) => {
        const handleDelete = async () => {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/comments/${comment.comment_id}`, {
                method: "DELETE"
            });
            await response.text();
            setComments(comments.filter(comment => comment !== comments[index]));
        }

        return (
            <div key={index}>
                <p>{comment.comment}</p>
                <button aria-label="delete" onClick={handleDelete}>
                    <MdOutlineDelete aria-hidden="true"/>
                </button>
            </div>
        )
    });

    return (
        <main>
            <div className="container">
                <Link to={`/${name}`}>
                    <img src={require("../img/home.png")} alt="Return to previous page."/>
                </Link>
            </div>
            { edit
                ? <EditListItem list={list} setList={setList} setEdit={setEdit}/>
                : <div>
                    <h1>{list.title}</h1>
                    <p>{list.list_item}</p>
                    <button aria-label="edit" onClick={() => setEdit(!edit)}>
                        <AiOutlineEdit aria-hidden="true"/>
                    </button>
                    <button aria-label="reply" onClick={() => setReply(!reply)}>
                        <BsReply aria-hidden="true"/>
                    </button>
                    <button aria-label="delete" onClick={handleDelete}>
                        <MdOutlineDelete aria-hidden="true"/>
                    </button>
                 </div> }
            { reply
                ? <CommentForm id={id} setReply={setReply} setComments={setComments} fetchComments={fetchComments}/>
                : null }
            <div className="comments">
                {mapComments}
            </div>
        </main>
    )
}

export default ListPage;