const router = require("express").Router();
const db = require("../models");
const { List } = db;

// GET route for one list based on id.
router.get("/:id", (req, res) => {
    List.findOne({where: {list_id: `${req.params.id}`}})
        .then(list => res.json(list))
        .catch(() => res.status(404).json({error: "List not found."}));
});

// GET route for all lists based on category id.
router.get("/category/:id", (req, res) => {
    List.findAll({
        where: {category_id: `${req.params.id}`},
        order: [["list_id", "DESC"]]
    })
        .then(lists => res.json(lists))
        .catch(() => res.status(404).json({error: "Lists not found."}));
});

router.post("/", (req, res) => {
    List.create(req.body)
        .then(() => res.send("Success."))
        .catch(() => res.send("Error: Couldn't post list."));
});

router.put("/:id", (req, res) => {
    List.update(req.body, {where: {list_id: `${req.params.id}`}})
        .then(() => res.send("Success."))
        .catch(() => res.send("Error: Couldn't update list."));
});

router.delete("/:id", (req, res) => {
    List.destroy({where: {list_id: `${req.params.id}`}})
        .then(() => res.send("Success."))
        .catch(() =>res.send("Error: Couldn't delete list."));
});

module.exports = router;