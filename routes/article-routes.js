// Server setup
const express = require("express");
const multer = require("multer");
const path = require("path");
const articleRouter = express.Router();

// Functions
const articleHelpers = require("../lib/article-helpers");

// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${process.env.UPLOADS}/images/`);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ dest: `${process.env.UPLOADS}/images/`, storage });

articleRouter.post("/", upload.any(), articleHelpers.postArticle);
articleRouter.get("/new", articleHelpers.newArticle);
articleRouter
  .route("/:id")
  .get(articleHelpers.getArticle)
  .put(upload.any(), articleHelpers.putArticle)
  .delete(articleHelpers.deleteArticle);
articleRouter.get("/:id/edit", articleHelpers.editArticle);

module.exports = articleRouter;
