const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const loginUser = (req, res) => {
  // Lookup user
  knex("users")
    .where({ username: req.body.username })
    .then(users => {
      if (users.length === 1) {
        // Login
        req.session.user = req.body.username;
        req.session.isLoggedIn = true;
      } else {
        // TODO: error handling
        console.log(`${users.length} users with that name`);
      }
      res.redirect("/");
    });
}

module.exports = loginUser;
