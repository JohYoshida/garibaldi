// Server requirements
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const uuid = require("uuid/v1");

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbconfig = require("./knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  knex("articles").then(articles => {
    res.render("index", { articles });
  });
});
app.post("/", (req, res) => {
  knex("articles")
    .insert({
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    })
    .then(() => res.redirect("/"));
});
app.get("/new", (req, res) => res.render("new"));
app.get("/articles/:id", (req, res) => {
  knex("articles")
    .where({ id: req.params.id })
    .first()
    .then(article => {
      res.render("show", { article });
    });
});

// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
