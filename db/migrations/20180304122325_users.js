
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("articles"),
    knex.schema.dropTableIfExists("users"),
    knex.schema.createTable("articles", table => {
      table.string("id");
      table.string("title");
      table.string("user_id").references("users");
      table.text("text");
      table.timestamps();
      table.jsonb("components");
      table.jsonb("headers");
      table.jsonb("paragraphs");
      table.jsonb("images");
    }),
    knex.schema.createTable("users", table => {
      table.string("username");
      table.string("password");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("articles"),
    knex.schema.dropTableIfExists("users"),
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
