import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import EditListItem from "./EditListItem";
import { AiOutlineEdit } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

//Buttons to edit, reply, and delete for posts

function ListPage(props) {
    const [replyClicked, setReplyClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [category, setCategory] = useState({});

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/categories/${props.list.category_id}`)
            const data = await response.json();
            setCategory(data);
        }
        fetchCategory();
    }, []);

    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${props.list.list_id}`, {
            method: "DELETE"
        })
        await response.text();
        navigate(`/${category.name}`);
        window.location.reload();
        return;
    }

    return (
        <>
            <Link className="container" to="/">
                <img className="logo"
                    src={require("../img/home.png")}
                    alt="Buck-It's logo, a bucket with a rainbow coming out of it saying 'home'." />
            </Link>
            {editClicked
                ? <EditListItem id={props.list.list_id} />
                :
                <div className="item">
                    <h2>{props.list.title}</h2>
                    <p>{props.list.list_item}</p>
                    <button title="edit" id="edit" onClick={() => setEditClicked(!editClicked)}><AiOutlineEdit /></button>
                    <button title="reply" id="reply" onClick={() => setReplyClicked(!replyClicked)}><BsReply /></button>
                    <button title="delete" onClick={handleDelete}><MdOutlineDelete /></button>
                </div>
            }
            {replyClicked ? <CommentForm id={props.list.list_id} />
                : null
            }
            <div className="comments">
                <Comments id={props.list.list_id} />
            </div>
        </>
    )
}

export default ListPage;