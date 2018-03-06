const bcrypt = require("bcrypt");
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).status({ error: "A username and password are required" });
    return;
  }
  bcrypt.hash(password, 10, (err, hash) => {
    knex("users")
      .where({ username: username })
      .then(users => {
        if (users.length > 0) {
          console.log("That username is taken!");
          res.status(501).send(JSON.stringify({
            error: "That username is taken!"
          }));
          return;
        }
        // Add user to database
        console.log(`Adding user ${req.body.username} to database`);
        knex("users")
          .insert({
            username: req.body.username,
            password: hash
          })
          .then(() => {
            // Login
            req.session.user = req.body.username;
            req.session.isLoggedIn = true;
            res.redirect("/");
          });
      });
  });
};

module.exports = registerUser;
