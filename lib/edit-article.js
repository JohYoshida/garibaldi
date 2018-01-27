const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

const editArticle = (id, article, res) => {
  knex("articles")
    .where({ id: id })
    .first()
    .update({
      title: article.title,
      text: article.text
    })
    .then(article => {
      res.redirect(`/articles/${id}`);
    });
};

module.exports = editArticle;
