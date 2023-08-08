const router = require("express").Router();
const db = require("../models");
const { Category } = db;

// GET route for all categories.
router.get("/", (req, res) => {
    Category.findAll()
            .then(categories => res.json(categories))
            .catch(() => res.status(404).json({error: "Categories not found."}));
});

// GET route for one category based on name.
router.get("/:name", (req, res) => {
    Category.findOne({where: {name: `${req.params.name}`}})
            .then(category => res.json(category))
            .catch(() => res.status(404).json({error: "Category not found."}));
});

module.exports = router;