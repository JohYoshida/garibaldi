"use strict";

// Server requirements
const express = require("express");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbconfig = require("./knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

// Scripts
const ArticleHelpers = require("./lib/article-helpers");

// Middleware
// Parse multipart/form-data forms
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${process.env.UPLOADS}/images/`);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ dest: `${process.env.UPLOADS}/images/`, storage });
// Parse application/x-www-form-urlencoded forms
app.use(bodyParser.urlencoded({ extended: false }));
// Use static paths
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./dist")));
// Method Override
app.use(methodOverride("_method"));
// Cookie Session
app.use(
  cookieSession({
    name: "session",
    keys: ["secret", "keys"]
  })
);

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  ArticleHelpers.getAllArticles(res, req.session);
});
app.post("/", upload.any(), (req, res) => {
  ArticleHelpers.postArticle(req, res);
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", (req, res) => {
  // Check for existing users with that username
  knex("users")
    .where({ username: req.body.username })
    .then(users => {
      if (users.length === 0) {
        // Add user to database
        console.log(`Adding user ${req.body.username} to database`);
        knex("users")
          .insert({
            username: req.body.username,
            password: req.body.password
          })
          .then(() => {
            // Login
            req.session.user = req.body.username;
            req.session.isLoggedIn = true;
            res.redirect("/");
          });
      } else {
        // TODO: error handling
        console.log("That username is taken!");
        res.redirect("/");
      }
    });
});
// Article routes
app.get("/new", (req, res) => {
  ArticleHelpers.newArticle(res);
});
app.put("/articles/:id", upload.any(), (req, res) => {
  ArticleHelpers.editArticle(req, res);
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
