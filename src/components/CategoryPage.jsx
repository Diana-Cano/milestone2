import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListForm from './ListForm';

//Posts page. Where different user created posts can be seen and new posts can be created.

function CategoryPage(props) {
    const [clicked, setClicked] = useState(false);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://buck-it-back-end.vercel.app/api/lists/category/${props.category.category_id}`)
            const data = await response.json()
            setLists(data);
        }
        fetchData();
    }, []);

    let mapLists = lists.map((list, index) => {
        return (
            <div className="item" key={index}>
                <Link className="link" to={`/${props.category.name}/${list.list_id}`}><h2>{list.title}</h2></Link>
                <p>{list.list_item}</p>
            </div>
        )
    });

    return (
        <>
            <Link className="container" to="/">
                <img className="logo"
                src={require("../img/home.png")}
                alt="Buck-It's logo, a bucket with a rainbow coming out of it saying 'home'."/>
            </Link>
            <h1 className="cat-title">❝{props.category.title}❞</h1>
            <div className="flex">
            <button  onClick={() => setClicked(!clicked)}>I have a new idea!</button></div>
            { clicked
            ? <ListForm id={props.category.category_id}/>
            : null
            }
            {mapLists}
        </>
    )
}

export default CategoryPage;