
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("articles", table => {
      table.dropColumn("text");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("articles", table => {
      table.string("text");
    })
  ]);
};
