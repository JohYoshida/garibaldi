const uuid = require("uuid/v1");

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("articles"),
    knex.schema.createTable("articles", table => {
      table.string("id");
      table.string("title");
      table.text("text");
      table.timestamps();
      table.jsonb("components");
      table.jsonb("headers");
      table.jsonb("paragraphs");
      table.jsonb("images");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("articles"),
    knex.schema.createTable("articles", table => {
      table.string("id");
      table.string("title");
      table.text("text");
      table.timestamps();
    })
  ]);
};
