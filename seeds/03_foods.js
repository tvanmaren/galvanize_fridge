'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('foods').insert({
          id: 1,
          user_id: 3,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481581975/beufn9spj6t6yksjgfp1.jpg',
          comments: 'My lunch for Monday',
          expiration: 1481765951054,
          category: 1,
        }),
        knex('foods').insert({
          id: 2,
          user_id: 1,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481582367/cc7ooxvxjyb5cpi4w6rj.jpg',
          comments: 'Milk for everyone',
          expiration: 1000000,
          category: 2,
        }),
        knex('foods').insert({
          id: 3,
          user_id: 4,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481582289/tv3mhn3p0ukyoiz73fjj.jpg',
          comments: 'Water for the Galvanize Holiday Party',
          expiration: Date.now(),
          category: 3,
        }),
        knex('foods').insert({
          id: 4,
          user_id: 3,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481581975/beufn9spj6t6yksjgfp1.jpg',
          comments: 'My lunch for Monday',
          expiration: 1481765951054,
          category: 1,
        }),
        knex('foods').insert({
          id: 5,
          user_id: 1,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481582367/cc7ooxvxjyb5cpi4w6rj.jpg',
          comments: 'Milk for everyone',
          expiration: 1000000,
          category: 2,
        }),
        knex('foods').insert({
          id: 6,
          user_id: 4,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481582289/tv3mhn3p0ukyoiz73fjj.jpg',
          comments: 'Water for the Galvanize Holiday Party',
          expiration: Date.now(),
          category: 3,
        }),
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('foods_id_seq', (SELECT MAX(id) FROM foods))");
    });
};
