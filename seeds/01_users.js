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
          hashed_password: '$2a$12$awS7JbhTyfgDlw2Q06CqNOdhvALQRRG0uScHhO6XPSs3UbzdlfjZS',
          is_admin: true
        })
      ]);
    })
    .then(() => {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        });
};
