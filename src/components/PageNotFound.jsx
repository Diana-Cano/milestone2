import { Link } from "react-router-dom";

// Error page that displays when the page is not found
function PageNotFound() {
    return (
        <div className="flex">
            <img className="error" src={require("../img/404.png")} alt="A rain cloud over an empty bucket and the words 'Oh no! This bucket is empty! 404"/>
            <Link to="/"><img className="home" src={require("../img/404-home.png")} alt="A rainbow that says 'take me home'."/></Link>
        </div>
    )
}

export default PageNotFound;