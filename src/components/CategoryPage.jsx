import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ListForm from "./ListForm";

function CategoryPage() {
    const [create, setCreate] = useState(false);
    const [category, setCategory] = useState({});
    const [lists, setLists] = useState([]);
    
    const { name } = useParams();

    const fetchCategory = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/categories/${name}`);
        const data = await response.json();
        setCategory(data);
    }
    const fetchLists = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/category/${category.category_id}`);
        const data = await response.json();
        setLists(data);
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if(Object.keys(category).length) {
            fetchLists();
        }
    }, [category]);

    let mapLists = lists.map((list, index) => {
        return (
            <div key={index}>
                <h2>
                    <Link to={`${list.list_id}`}>{list.title}</Link> 
                </h2>
                <p>{list.list_item}</p>
            </div>
        )
    });

    return (
        <main>
            <div className="container">
                <Link to="/">
                    <img src={require("../img/home.png")} alt="Return to home page."/>
                </Link>
            </div>
            <h1>{category.title}</h1>
            <button onClick={() => setCreate(!create)}>I have a new idea!</button>
            { create
                ? <ListForm id={category.category_id} setCreate={setCreate} setLists={setLists} fetchLists={fetchLists}/>
                : null }
            <div className="list">
                {mapLists}
            </div>
        </main>
    )
}

export default CategoryPage;