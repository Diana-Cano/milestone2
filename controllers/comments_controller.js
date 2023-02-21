const router = require("express").Router();
const db = require("../models");
const { Comment } = db;

// GET route for all comments related to a specific list.

router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {list_id: `${req.params.id}`},
        order: [["comment_id", "DESC"]]
    })
        .then(comments => {
            res.json(comments);
        })
        .catch(() => {
            res.send("Error: Couldn't find comments.");
        });
});

// POST route for new comments.

router.post("/", (req, res) => {
    Comment.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.send("Error: Couldn't post comment.");
        });
});

// DELETE route for a specific comment.

router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {comment_id: `${req.params.id}`}
    })
        .then(num => {
            if(num == 1) {
                res.send("Comment has been successfully deleted.");
            } else {
                res.send("Error: Couldn't delete comment.");
            }
        });
});

module.exports = router;

