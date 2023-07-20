import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="error">
            <div>
                <div>
                    <Link to="/" >
                        <img src={require("../img/takemehome.png")} alt="A rainbow that takes you back to the home page."/>
                    </Link>
                </div>
                <img src={require("../img/404.png")} alt="A rain cloud over an empty bucket. Error 404, page not found."/>
            </div>
        </div>
    )
}

export default PageNotFound;