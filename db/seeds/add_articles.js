const uuid = require('uuid/v1');

exports.seed = function(knex, Promise) {
  // Delete all existing entries
  return knex('articles').del()
    .then(function () {
      // Insert seed entries
      return knex('articles').insert([
        {
          id: uuid(),
          title: 'Sample Article 1',
          text: 'This is what an article will look like.'
        },
        {
          id: uuid(),
          title: 'Sample Article 2',
          text: 'This is what another article will look like.'
        }
      ]);
    });
};
