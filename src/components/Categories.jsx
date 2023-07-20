import { Link } from "react-router-dom";
import "../css/App.css";

//All the tombstones on the landing page 

function Categories({categories}) {
    let mapCategories = categories.map((category, index) => {
        return (
            <div key={index} className="tomb">
                <img src={require(`../img/${category.name}.png`)} alt="A tomb that has RIP written on it." />
                <div>
                    <Link className="link" to={`/${category.name}`}><h1>❝{category.title}❞</h1></Link>
                    <p>{category.description}</p>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="container">
                <img className="logo"
                    src={require("../img/logowithtagline.png")}
                    alt="Buck-It's logo, a bucket with a rainbow coming out of it saying 'fill your bucket before you kick it'." />
            </div>
            <div className="container">
                {mapCategories}
            </div>
        </>
    )
}

export default Categories;