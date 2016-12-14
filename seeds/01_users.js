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
          is_admin: false
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
        }),
        knex('users').insert({
          id: 7,
          first_name: 'Tara',
          last_name: 'McLauchlan',
          email: 'tara.mclauchlan@galvanize.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: false
        }),
        knex('users').insert({
          id: 8,
          first_name: 'Katie',
          last_name: 'Jenkins',
          email: 'kind2karma@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: false
        }),
        knex('users').insert({
          id: 9,
          first_name: 'Teddi',
          last_name: 'Maull',
          email: 'teddi.maull@galvanize.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: true
        }),
        knex('users').insert({
          id: 10,
          first_name: 'Matthew',
          last_name: 'Gordon',
          email: 'laxredemption5525@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: false
        }),
        knex('users').insert({
          id: 11,
          first_name: 'Malila',
          last_name: 'Clearwater',
          email: 'malilaclearwater@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: false
        }),
        knex('users').insert({
          id: 12,
          first_name: 'Ali',
          last_name: 'Hobbs',
          email: 'alisuehobbs@gmail.com',
          hashed_password: '$2a$12$bhR.d3cbb5jehk2ConAo6.Nb/fK9Y27EkRVG1CVFAq9fnxl.YXyca',
          is_admin: false
        })
      ]);
    })
    .then(() => {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        });
};
