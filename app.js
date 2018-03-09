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

// Functions
const {getArticles} = require("./lib/article-helpers");
const loginUser = require("./lib/login-user");
const registerUser = require("./lib/register-user");

// Routes
const articleRoutes = require("./routes/article-routes");

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

// Bundled routes
app.use("/articles", articleRoutes);
// Routes
app.get("/", getArticles);
app.route("/register")
  .get((req, res) => res.render("register"))
  .post(registerUser);
app.route("/login")
  .get((req, res) => res.render("login"))
  .post(loginUser);
app.post("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  req.session.user = "";
  res.redirect("/");
});

// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
