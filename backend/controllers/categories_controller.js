const router = require("express").Router();
const db = require("../models");
const { Category } = db;

// GET route for all categories.
router.get("/", (req, res) => {
    Category.findAll()
            .then(categories => res.json(categories))
            .catch(() => res.json({error: "Couldn't find categories."}));
});

// GET route for one category.
router.get("/:name", (req, res) => {
    Category.findOne({ where: { name: `${req.params.name}` } })
            .then(category => res.json(category))
            .catch(() => res.json({error: "Couldn't find category."}))
});

module.exports = router;