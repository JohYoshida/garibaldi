const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const getOneAricle = (id, res, mode) => {
  knex("articles")
    .where({ id: id })
    .first()
    .then(article => {
      switch (mode) {
        case 'show':
          res.render("show", { article });
          break;
        case 'edit':
        console.log(article);
          res.render("edit", { article });
          break;
        default:
          // TODO: throw error
          console.log('Error: Invalid mode.');
          res.redirect("/");
      }
    });
}
module.exports = getOneAricle;
