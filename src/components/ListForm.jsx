import { useState, useEffect } from "react";

function ListForm(props) {
    const [idea, setIdea] = useState({
        title: "",
        list_item: "",
        category_id: 0
    });

    useEffect(() => {
        setIdea({ category_id: props.id });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        
        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idea)
        });
        await response.json();

        props.setForm(false);
        props.setLists([]);
        props.fetchLists();
    }

    const handleChange = e => {
        setIdea({ ...idea, [e.target.id]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter your Buck-It list item.</label>
            <input id="title" type="text" maxLength="26" onChange={handleChange} required/>
            <label htmlFor="list_item">Describe your awesome idea here!</label>
            <textarea id="list_item" maxLength="255" onChange={handleChange} required></textarea>
            <button>Submit</button>
        </form>
    )
}

export default ListForm;