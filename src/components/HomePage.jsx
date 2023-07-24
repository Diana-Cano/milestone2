import { Link } from "react-router-dom";

function HomePage({categories}) {
    let categoryLinks = categories.map((category, index) => {
        return (
            <div key={index} className="tomb">
                <img src={require(`../img/tombstone/${category.name}.png`)} alt=""/>
                <div>
                    <h2>
                        <Link to={`/${category.name}`}>{category.title}</Link>
                    </h2>
                    <p>{category.description}</p>
                </div>
            </div>
        )
    });

    return (
        <main>
            <h1>
                <img src={require("../img/logo.png")} alt="Buck-It's logo. Fill your bucket before you kick it."/>   
            </h1>
            <nav>
                {categoryLinks}
            </nav>
        </main>
    )
}

export default HomePage;