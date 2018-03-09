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
};

const instantiateUserCookie = req => {
  // Make sure req.session.user is instantiated
  if (!req.session.user) {
    req.session.user = "";
  }
};

module.exports = {
  getArticle: (req, res) => {
    instantiateUserCookie(req);
    const {user, isLoggedIn} = req.session;
    // Get user's articles
    knex("articles")
      .where({ user_id: user })
      .then(userArticles => {
        // Get public articles
        knex("articles")
          .whereNot({ user_id: user })
          .where({ is_private: false })
          .then(publicArticles => {
            // Get target article
            knex("articles")
              .where({ id: req.params.id })
              .first()
              .then(article => {
                // Make sure all parts of the article are arrays
                normalizeArticle(article);
                // Render article
                res.render("show", {
                  userArticles,
                  publicArticles,
                  article,
                  user,
                  isLoggedIn
                });
              });
          });
      });
  },

  getArticles: (req, res) => {
    instantiateUserCookie(req);
    const {user, isLoggedIn} = req.session;
    // Get user's articles
    knex("articles")
      .where({ user_id: user })
      .then(userArticles => {
        // Get public articles
        knex("articles")
          .whereNot({ user_id: user })
          .where({ is_private: false })
          .then(publicArticles => {
            res.render("index", { userArticles, publicArticles, user, isLoggedIn });
          });
      });
  },

  newArticle: (req, res) => {
    instantiateUserCookie(req);
    const { user, isLoggedIn } = req.session;
    // Get user's articles
    knex("articles")
      .where({ user_id: user })
      .then(userArticles => {
        // Get public articles
        knex("articles")
          .whereNot({ user_id: user })
          .where({ is_private: false })
          .then(publicArticles => {
            res.render("new", { userArticles, publicArticles, user, isLoggedIn });
          });
      });
  },

  editArticle: (req, res) => {
    instantiateUserCookie(req);
    const { user, isLoggedIn } = req.session;
    // Get user's articles
    knex("articles")
      .where({ user_id: user })
      .then(userArticles => {
        // Get public articles
        knex("articles")
          .whereNot({ user_id: user })
          .where({ is_private: false })
          .then(publicArticles => {
            // Get target article
            knex("articles")
              .where({ id: req.params.id })
              .first()
              .then(article => {
                // Make sure all parts of the article are arrays
                normalizeArticle(article);
                // Render article
                res.render("edit", {
                  userArticles,
                  publicArticles,
                  article,
                  user,
                  isLoggedIn
                });
              });
          });
      });
  },

  postArticle: (req, res) => {
    // Get username from cookies
    const { user } = req.session;
    // Create unique id
    const id = uuid();
    // Save any images to /public/images
    const images = getImages(req);
    // Check if article is private
    let isPrivate = false;
    if (req.body.private) {
      isPrivate = true;
    }
    // Insert article into database
    knex("articles")
      .insert({
        id: id,
        user_id: user,
        title: req.body.title,
        text: req.body.text,
        is_private: isPrivate,
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
    // Compare logged in user with article owner
    if (req.session.user !== req.body.user_id) {
      console.log("You don't have permission to edit this article!");
      res.status(501).send(
        JSON.stringify({
          error: "You don't have permission to edit this article!"
        })
      );
    } else {
      // Save any images to /public/images
      const images = getImages(req);
      // Check if article is private
      let isPrivate = false;
      if (req.body.private) {
        isPrivate = true;
      }
      // Update article in database
      knex("articles")
        .where({ id: req.params.id })
        .first()
        .update({
          title: req.body.title,
          text: req.body.text,
          is_private: isPrivate,
          updated_at: new Date(),
          components: JSON.stringify(req.body.component),
          headers: JSON.stringify(req.body.header),
          paragraphs: JSON.stringify(req.body.paragraph),
          images: JSON.stringify(images)
        })
        .then(article => {
          res.redirect(`/articles/${req.params.id}`);
        });
    }
  },

  deleteArticle: (req, res) => {
    const { user, isLoggedIn } = req.session;
    if (user !== req.body.user_id) {
      res.status(501).send(
        JSON.stringify({
          error: "You don't have permission to delete this article!"
        })
      );
    } else {
      instantiateUserCookie(req);
      // Get user's articles
      knex("articles")
        .where({ user_id: user })
        .then(userArticles => {
          // Get public articles
          knex("articles")
            .whereNot({ user_id: user })
            .where({ is_private: false })
            .then(publicArticles => {
              // Get target article
              knex("articles")
                .where({ id: req.params.id })
                .first()
                .del()
                .then(() => {
                  res.render("index", {
                    userArticles,
                    publicArticles,
                    user,
                    isLoggedIn
                  });
                });
            });
        });
    }
  }
};
