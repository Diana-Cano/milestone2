const router = require("express").Router();
const db = require("../models");
const { Comment } = db;

// GET route for all comments based on list id.
router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {list_id: `${req.params.id}`},
        order: [["comment_id", "DESC"]]
    })
        .then(comments => res.json(comments))
        .catch(() => res.status(404).json({error: "Comments not found."}));
});

router.post("/", (req, res) => {
    Comment.create(req.body)
            .then(() => res.send("Success."))
            .catch(() => res.send("Error: Couldn't post comment."));
});

router.delete("/:id", (req, res) => {
    Comment.destroy({where: {comment_id: `${req.params.id}`}})
            .then(() => res.send("Success."))
            .catch(() => res.send("Error: Couldn't delete comment."));
});

module.exports = router;