import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import EditListItem from "./EditListItem";
import { AiOutlineEdit } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

function ListPage() {
    const [replyClicked, setReplyClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [list, setList] = useState({});

    const { name, id } = useParams();
    const navigate = useNavigate();

    const fetchList = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${id}`);
        const data = await response.json();
        setList(data);
    }

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${list.list_id}`, {
            method: "DELETE"
        })
        await response.text();
        navigate(`/${name}`);
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <main>
            <div className="container">
                <Link to="/">
                    <img src={require("../img/home.png")} alt="Return to home page."/>
                </Link>
            </div>
            {editClicked
                ? <EditListItem/>
                :
                <div className="item">
                    <h2>{list.title}</h2>
                    <p>{list.list_item}</p>
                    <button title="edit" id="edit" onClick={() => setEditClicked(!editClicked)}><AiOutlineEdit /></button>
                    <button title="reply" id="reply" onClick={() => setReplyClicked(!replyClicked)}><BsReply /></button>
                    <button title="delete" onClick={handleDelete}><MdOutlineDelete /></button>
                </div>
            }
            {replyClicked ? <CommentForm id={list.list_id} />
                : null
            }
            <div className="comments">
                <Comments id={list.list_id} />
            </div>
        </main>
    )
}

export default ListPage;