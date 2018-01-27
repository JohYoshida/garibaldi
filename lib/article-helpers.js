const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = {
  getAllArticles: (res) => {
    knex("articles").then(articles => {
      res.render("index", { articles });
    });
  },
  getOneAricle: (id, res, mode) => {
    knex("articles")
      .where({ id: id })
      .first()
      .then(article => {
        switch (mode) {
          case 'show':
            res.render("show", { article });
            break;
          case 'edit':
            res.render("edit", { article });
            break;
          default:
            // TODO: throw error
            console.log('Error: Invalid mode.');
            res.redirect("/");
        }
      });
  },
  postArticle: (article, res) => {
    knex("articles")
      .insert({
        id: uuid(),
        title: article.title,
        text: article.text
      })
      .then(() => res.redirect("/"));
  },
  editArticle: (id, article, res) => {
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
  },
  deleteArticle: (id, res) => {
    knex("articles")
      .where({ id: id })
      .first()
      .del()
      .then(() => {
        res.redirect("/");
      });
  }
}
