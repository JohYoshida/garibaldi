const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const uuid = require("uuid/v1");

// Make sure all article components are stored as arrays
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

// Return an array of image filenames
const getImages = req => {
  const images = [];
  if (req.files) {
    for (file in req.files) {
      let photo = req.files[file];
      images.push(req.files[file].filename);
    }
  }
  return images;
}

module.exports = {
  // GET /new
  newArticle: res => {
    knex("articles").then(articles => {
      res.render("new", { articles });
    });
  },

  // GET /
  getAllArticles: res => {
    knex("articles").then(articles => {
      res.render("index", { articles });
    });
  },

  // GET /articles/:id and /articles/:id/edit
  getOneAricle: (id, res, mode) => {
    knex("articles").then(articles => {
      knex("articles")
        .where({ id: id })
        .first()
        .then(article => {
          // Make sure all parts of the article are arrays
          normalizeArticle(article);
          // Render article
          switch (mode) {
            case "show":
              res.render("show", { article, articles });
              break;
            case "edit":
              res.render("edit", { article, articles });
              break;
            default: {
              // TODO: throw error
              console.log("Error: Invalid mode.");
              res.redirect("/");
            }
          }
        });
    });
  },

  // POST /
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
      .then(() => res.redirect(`/articles/${id}`));
  },

  // PUT /articles/:id
  editArticle: (req, res) => {
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

  // DELETE /articles/:id
  deleteArticle: (id, res) => {
    knex("articles")
      .where({ id: id })
      .first()
      .del()
      .then(() => {
        res.redirect("/");
      });
  }
};
