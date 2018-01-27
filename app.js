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
const ArticleHelpers = require("./lib/article-helpers");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  ArticleHelpers.getAllArticles(res);
});
app.post("/", (req, res) => {
  ArticleHelpers.postArticle(req.body, res);
});
app.get("/new", (req, res) => res.render("new"));
app.put("/articles/:id", (req, res) => {
  ArticleHelpers.editArticle(req.params.id, req.body, res);
});
app.get("/articles/:id", (req, res) => {
  ArticleHelpers.getOneAricle(req.params.id, res, "show");
});
app.delete("/articles/:id", (req, res) => {
  ArticleHelpers.deleteArticle(req.params.id, res);
});
app.get("/articles/:id/edit", (req, res) => {
  ArticleHelpers.getOneAricle(req.params.id, res, "edit");
});
// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
