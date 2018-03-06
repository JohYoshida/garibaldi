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
          user_id: "Joh",
          title: "A Proper Article",
          text: "This is what an article will look like.",
          is_private: 0,
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "h", "p", "i", "p"]),
          headers: JSON.stringify(["Headers", "Images"]),
          paragraphs: JSON.stringify([
            "A proper article should have a header.",
            "A proper article may have an image.",
            "The image may be surrounded by text."
          ]),
          images: JSON.stringify(["power.jpeg"])
        },
        {
          id: uuid(),
          user_id: "Joh",
          title: "Hi Sophie!",
          text: "",
          is_private: 0,
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "i", "p", "h", "p", "p", "p", "p"]),
          headers: JSON.stringify(["A simple blog app", "To Do"]),
          paragraphs: JSON.stringify([
            "It's still pretty barebones, but you can now make articles with headers, paragraphs, and images, in any order or quantity you want.",
            "Here's a picture of a very fat rat.",
            "Styling! This website looks like an error page. I'm going to fix that when I feel like struggling with CSS. Let me know if you have any input (or stylesheets)!",
            "I'm also hoping to make it so you can edit an article without having to start from scratch. Might be difficult with the janky system I built, but we'll see.",
            "Let me know if there's anything else you want me to add!",
            "Joh"
          ]),
          images: JSON.stringify(["power.jpeg"])
        },
        {
          id: uuid(),
          user_id: "Joh",
          title: "A Private Article",
          text: "This is what an article will look like.",
          is_private: 1,
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "h", "p", "i", "p"]),
          headers: JSON.stringify(["Headers", "Images"]),
          paragraphs: JSON.stringify([
            "A proper article should have a header.",
            "A proper article may have an image.",
            "The image may be surrounded by text."
          ]),
          images: JSON.stringify(["power.jpeg"])
        }
      ]);
    });
};
