'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('foods').insert({
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'This food is great!',
          expiration: 34235
        }),
        knex('foods').insert({
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'This food is okay',
          expiration: 34235
        })
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('foods_id_seq', (SELECT MAX(id) FROM foods))")
    });
};
