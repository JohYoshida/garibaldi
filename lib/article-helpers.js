const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const uuid = require("uuid/v1");

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
  postArticle: (req, res) => {
    const images = [];

    // Save any images to /public/images
    if (req.files) {
      for (file in req.files) {
        let photo = req.files[file];
        let imgID = uuid();
        images.push(imgID);
        photo.mv(`./public/images/${imgID}.jpeg`)
      }
    }

    knex("articles")
      .insert({
        id: uuid(),
        title: req.body.title,
        text: req.body.text,
        created_at: new Date(),
        components: JSON.stringify(req.body.component),
        headers: JSON.stringify(req.body.header),
        paragraphs: JSON.stringify(req.body.paragraph),
        images: JSON.stringify(images)
      })
      .then(() => res.redirect("/"));
  },
  editArticle: (id, article, res) => {
    knex("articles")
      .where({ id: id })
      .first()
      .update({
        title: article.title,
        text: article.text,
        updated_at: new Date()
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
