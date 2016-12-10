'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('food').insert({
          id: 1,
          user_id: 1,
          image_url: '',
          comments: 'Very tasty!',
          category: 1,
        }),
      ]);
    });
};
