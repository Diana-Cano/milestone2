//dependencies 
require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { Sequelize } = require("sequelize");
require("./config/config");

//configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/categories", require("./controllers/categories_controller"));
app.use("/api/lists", require("./controllers/lists_controller"));
app.use("/api/comments", require("./controllers/comments_controller"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

//listen
app.listen(PORT, () => {
    console.log(`Filling your bucket from port: ${PORT}`);
});