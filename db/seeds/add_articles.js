const uuid = require("uuid/v1");

exports.seed = function(knex, Promise) {
  // Delete all existing entries
  return knex("articles")
    .del()
    .then(function() {
      // Insert seed entries
      return knex("articles").insert([
        {
          id: uuid(),
          title: "A Proper Article",
          text: "This is what an article will look like.",
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "h", "p", "i", "p"]),
          headers: JSON.stringify(["Headers", "Images"]),
          paragraphs: JSON.stringify([
            "A proper article should have a header.",
            "A proper article may have an image.",
            "The image may be surrounded by text."
          ]),
          images: JSON.stringify(["alien.jpeg"])
        },
        {
          id: uuid(),
          title: "Old Article",
          text: "This is what an old article will look like.",
          created_at: new Date()
        }
      ]);
    });
};
