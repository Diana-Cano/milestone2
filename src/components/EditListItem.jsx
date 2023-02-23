import { useState, useEffect } from "react";

//Edit functionality for posts 

function EditListItem(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchThisList = async () => {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${props.id}`)
            const data = await response.json();
            setList(data);
        }
        fetchThisList();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${list.list_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(list)
            });
            await response.json();
            window.location.reload();
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = e => {
        setList({ ...list, [e.target.id]: e.target.value });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Change your title here.</label>
                <input id="title" name="title" type="text" defaultValue={list.title} onChange={handleChange} required />
                <label htmlFor="list_item">Edit your Buck-It list item.</label>
                <textarea id="list_item" name="list_item" cols="50" rows="3" maxLength="255" defaultValue={list.list_item} onChange={handleChange} required></textarea>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
};

export default EditListItem;