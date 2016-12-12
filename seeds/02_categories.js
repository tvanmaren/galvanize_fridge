'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({
          id: 1,
          name: 'personal'
        }),
        knex('categories').insert({
          id: 2,
          name: 'community'
        }),
        knex('categories').insert({
          id: 3,
          name: 'event'
        }),
      ]);
    });
};
