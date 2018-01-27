// Server requirements
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const uuid = require("uuid/v1");

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbconfig = require("./knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

// Scripts
// import {getAllArticles} from "lib/knex-queries";
const getAllArticles = require("./lib/get-all-articles");
const getOneAricle = require("./lib/get-one-article");
const postArticle = require("./lib/post-article");
const editArticle = require("./lib/edit-article");
const deleteArticle = require("./lib/delete-article");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  getAllArticles(res);
});
app.post("/", (req, res) => {
  postArticle(req.body, res);
});
app.put("/articles/:id", (req, res) => {
  editArticle(req.params.id, req.body, res);
});
app.get("/new", (req, res) => res.render("new"));
app.get("/articles/:id", (req, res) => {
  getOneAricle(req.params.id, res, "show");
});
app.delete("/articles/:id", (req, res) => {
  deleteArticle(req.params.id, res);
});
app.get("/articles/:id/edit", (req, res) => {
  getOneAricle(req.params.id, res, "edit");
});
// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
