import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/categories`);
        const data = await response.json();
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    let mapCategories = categories.map((category, index) => {
        return (
            <div key={index}>
                <img src={require(`../img/tombstone/${category.name}.png`)} alt=""/>
                <div>
                    <h2>
                        <Link to={`${category.name}`}>{category.title}</Link>
                    </h2>
                    <p>{category.description}</p>
                </div>
            </div>
        )
    });

    return (
        <main>
            <h1 className="container">
                <img src={require("../img/logo.png")} alt="Buck-It's logo. Fill your bucket before you kick it."/>   
            </h1>
            <div className="graveyard">
                {mapCategories}
            </div>
        </main>
    )
}

export default HomePage;