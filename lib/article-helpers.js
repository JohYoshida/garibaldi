const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const uuid = require("uuid/v1");

const normalizeArticle = article => {
  if (typeof article.components === "string") {
    article.components = [article.components];
  }
  if (typeof article.headers === "string") {
    article.headers = [article.headers];
  }
  if (typeof article.paragraphs === "string") {
    article.paragraphs = [article.paragraphs];
  }
  if (typeof article.images === "string") {
    article.images = [article.images];
  }
};

const getImages = req => {
  const images = [];
  if (req.files) {
    for (file in req.files) {
      let photo = req.files[file];
      images.push(req.files[file].filename);
    }
  }
  return images;
};

module.exports = {
  getArticle: (req, res) => {
    const cookies = req.session;
    knex("articles").then(articles => {
      knex("articles")
        .where({ id: req.params.id })
        .first()
        .then(article => {
          // Make sure all parts of the article are arrays
          normalizeArticle(article);
          // Render article
          res.render("show", { article, articles, cookies });
        });
    });
  },

  getArticles: (req, res) => {
    const cookies = req.session;
    knex("articles").then(articles => {
      res.render("index", { articles, cookies });
    });
  },

  newArticle: (req, res) => {
    const cookies = req.session;
    knex("articles").then(articles => {
      res.render("new", { articles, cookies });
    });
  },

  editArticle: (req, res) => {
    const cookies = req.session;
    // Get all articles for sidebar
    knex("articles").then(articles => {
      // Get target article
      knex("articles")
        .where({ id: req.params.id })
        .first()
        .then(article => {
          // Make sure all parts of the article are arrays
          normalizeArticle(article);
          // Render article
          res.render("edit", { article, articles, cookies });
        });
    });
  },

  postArticle: (req, res) => {
    // Save any images to /public/images
    const images = getImages(req);
    // Insert article into database
    const id = uuid();
    knex("articles")
      .insert({
        id: id,
        title: req.body.title,
        text: req.body.text,
        created_at: new Date(),
        components: JSON.stringify(req.body.component),
        headers: JSON.stringify(req.body.header),
        paragraphs: JSON.stringify(req.body.paragraph),
        images: JSON.stringify(images)
      })
      .then(() => {
        res.redirect(`/articles/${id}`);
      });
  },

  putArticle: (req, res) => {
    const cookies = req.session;
    // Save any images to /public/images
    const images = getImages(req);
    // Update article in database
    knex("articles")
      .where({ id: req.params.id })
      .first()
      .update({
        title: req.body.title,
        text: req.body.text,
        updated_at: new Date(),
        components: JSON.stringify(req.body.component),
        headers: JSON.stringify(req.body.header),
        paragraphs: JSON.stringify(req.body.paragraph),
        images: JSON.stringify(images)
      })
      .then(article => {
        res.redirect(`/articles/${req.params.id}`);
      });
  },

  deleteArticle: (req, res) => {
    const cookies = req.session;
    knex("articles")
      .where({ id: req.params.id })
      .first()
      .del()
      .then(() => {
        const cookies = req.session;
        knex("articles").then(articles => {
          res.render("index", { articles, cookies });
        });
      });
  }
};
