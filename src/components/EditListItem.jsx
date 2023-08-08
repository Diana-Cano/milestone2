function EditListItem({list, setList, setEdit}) {
    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/${list.list_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        });
        await response.text();
        setEdit(false);
    }

    const handleChange = e => {
        setList({...list, [e.target.id]: e.target.value});
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Edit your title.</label>
            <input id="title" type="text" maxLength="26" defaultValue={list.title} onChange={handleChange} required/>
            <label htmlFor="list_item">Edit your Buck-It list item.</label>
            <textarea id="list_item" maxLength="255" defaultValue={list.list_item} onChange={handleChange} required></textarea>
            <button>Save Changes</button>
        </form>
    )
};

export default EditListItem;