'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({
          id: 1,
          name: 'Personal'
        }),
        knex('categories').insert({
          id: 2,
          name: 'Community'
        }),
        knex('categories').insert({
          id: 3,
          name: 'Event'
        }),
      ]);
    });
};
