const uuid = require("uuid/v1");

exports.seed = function(knex, Promise) {
  // Delete all existing entries
  return knex("users")
    .del()
    .then(function() {
      // Insert seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: "pass"
        }
      ]);
    });
};
