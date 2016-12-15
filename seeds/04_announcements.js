'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('announcements').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('announcements').insert({
          user_id: 1,
          title: 'Free Food',
          content: 'There is leftover food from a meet-up in the kitchen'
        }),
        knex('announcements').insert({
          user_id: 1,
          title: 'Missing Tupperware',
          content: 'My favorite tupperware is missing, too! Let\'s be friends!'
        }),
        knex('announcements').insert({
          user_id: 2,
          title: 'Missing Tupperware',
          content: 'My favorite tupperware is missing! Let me know if you find it'
        }),
        knex('announcements').insert({
          user_id: 5,
          title: 'Missing Tupperware',
          content: 'I found a sandwich on the ground... slack me if it\'s yours?'
        })
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('foods_id_seq', (SELECT MAX(id) FROM foods))");
    });
};
