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
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'My wife\'s best cooking!',
          category: 1,
        }),
        knex('food').insert({
          id: 2,
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'Please, take me and eat me',
          category: 2,
        }),
        knex('food').insert({
          id: 3,
          user_id: 1,
          image_url: 'https://goo.gl/CWVE6o',
          comments: 'Community!',
          category: 3,
        }),
      ]);
    });
};
