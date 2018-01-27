const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const deleteArticle = (id, res) => {
  knex("articles")
    .where({ id: id })
    .first()
    .del()
    .then(() => {
      res.redirect("/");
    });
};

module.exports = deleteArticle;
