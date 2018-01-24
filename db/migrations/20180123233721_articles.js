const uuid = require("uuid/v1");
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("articles", table => {
      table.string("id");
      table.string("title");
      table.string("text");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("articles")]);
};
