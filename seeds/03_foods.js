'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('foods').insert({
          id: 1,
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'This food is great!',
          expiration: 34235,
          category: 1,
        }),
        knex('foods').insert({
          id: 2,
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'This food is okay',
          expiration: 34235,
          category: 2,
        }),
        knex('foods').insert({
          id: 3,
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'This food is okay',
          expiration: 34235,
          category: 3,
        }),
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('foods_id_seq', (SELECT MAX(id) FROM foods))");
    });
};
