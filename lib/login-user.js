const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const bcrypt = require("bcrypt");

const loginUser = (req, res) => {
  const { username, password } = req.body;
  // Lookup user
  knex("users")
    .first("username", "password")
    .where({ username: username })
    .then(user => {
      if (!user) {
        res.send(JSON.stringify({error: "That username or password doesn't match our records."}));
        return;
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.user = username;
          req.session.isLoggedIn = true;
          res.redirect("/");
          return
        }
        res.send(JSON.stringify({error: "That username or password doesn't match our records."}))
      });
    });
};

module.exports = loginUser;
