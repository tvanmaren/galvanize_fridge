'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Fridge',
          last_name: 'Fridge',
          email: 'fridge@galvanize.com',
          hashed_password: '$2a$12$HgcZ3mkA8hSL7laPNTyO5OJvi75VoVuVrb1LbMAwN3LBi.Y/LmAlq',
          //Password: iamthefridge
          is_admin: true
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Cassie',
          last_name: 'Peterson',
          email: 'cassie.peterson@comcast.net',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        }),
        knex('users').insert({
          id: 3,
          first_name: 'Anna',
          last_name: 'Lotko',
          email: 'annaklotko@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        }),
        knex('users').insert({
          id: 4,
          first_name: 'Kevin',
          last_name: 'Cowley',
          email: 'cowley.kevin.l@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        }),
        knex('users').insert({
          id: 5,
          first_name: 'Tristan',
          last_name: 'Van Maren',
          email: 'tm.vanmaren@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        }),
        knex('users').insert({
          id: 6,
          first_name: 'Evan',
          last_name: 'Busse',
          email: 'evanbusse@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        })
      ]);
    })
    .then(() => {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        });
};
