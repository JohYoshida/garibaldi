const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const uuid = require("uuid/v1");

const postArticle = (article, res) => {
  knex("articles")
    .insert({
      id: uuid(),
      title: article.title,
      text: article.text
    })
    .then(() => res.redirect("/"));
}
module.exports = postArticle;
