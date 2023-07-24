import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <main>
            <div className="error404">
                <div>
                    <Link to="/">
                        <img src={require("../img/error/takemehome.png")} alt="A rainbow that takes you back to the home page."/>
                    </Link>
                </div>
                <img src={require("../img/error/404.png")} alt="A rain cloud over an empty bucket. Error 404, page not found."/>
            </div>
        </main>
    )
}

export default PageNotFound;