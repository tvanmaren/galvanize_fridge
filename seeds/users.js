'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Master Mason',
          last_name: 'Admin',
          email: 'mason@galvanize.com',
          hashed_password: 'masonlovesthemonster',
          is_admin: true
        })
      ]);
    });
};
