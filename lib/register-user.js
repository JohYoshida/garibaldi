const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const registerUser = (req, res) => {
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
            // TODO: bcrypt password
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
};

module.exports = registerUser;
