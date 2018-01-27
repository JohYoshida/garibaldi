const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const getAllArticles = (res) => {
  knex("articles").then(articles => {
    res.render("index", { articles });
  });
}

module.exports = getAllArticles;
