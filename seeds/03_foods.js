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
          user_id: 7,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752150/iflqxcml8klnmqfuetok.jpg',
          comments: 'Tara\'s Lunch',
          expiration: 1481924976680,
          category: 1,
        }),
        knex('foods').insert({
          id: 5,
          user_id: 8,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752362/m7q891rnludwsboniv7w.jpg',
          comments: 'Katie\'s Lunch',
          expiration: 1481925191415,
          category: 1,
        }),
        knex('foods').insert({
          id: 6,
          user_id: 9,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752478/fcegkjhxokkhhu1zc08b.jpg',
          comments: 'Teddi\'s Lunch',
          expiration: 1481838892328,
          category: 1,
        }),
        knex('foods').insert({
          id: 7,
          user_id: 5,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752518/yqqk9mbpnog4hgnlzbme.jpg',
          comments: 'The incredible edible BURRITO!',
          expiration: 1481838966410,
          category: 1,
        }),
        knex('foods').insert({
          id: 8,
          user_id:11,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752602/gfi7tqbivawe8zklvlel.jpg',
          comments: 'Malila\'s delicious salad',
          expiration: 1482184621524,
          category: 1,
        }),
        knex('foods').insert({
          id: 9,
          user_id: 10,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752658/s088kd8dqcf7mnjcitcf.jpg',
          comments: 'Everyone can take a bite of this sandwich!',
          expiration: 1482011910823,
          category: 2,
        }),
        knex('foods').insert({
          id: 10,
          user_id: 1,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752763/u0vdnmj0k64wsjukmbfo.jpg',
          comments: 'Event Luncheon--DO NOT TOUCH',
          expiration: 1482184859498,
          category: 3,
        }),
        knex('foods').insert({
          id: 11,
          user_id: 2,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752900/kojz6qgfnlqw1wncuamw.jpg',
          comments: 'Cassie\'s leftovers (for Cassie)',
          expiration: 1482012124336,
          category: 1,
        }),
        knex('foods').insert({
          id: 12,
          user_id: 3,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481752947/hhfepuqnmjwvcx9uonuj.jpg',
          comments: 'Anna\'s Awesome Pumpkin Turkey Chili',
          expiration: 1482184984798,
          category: 1,
        }),
        knex('foods').insert({
          id: 13,
          user_id: 1,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481753008/zzmzn62seqp6nkhthrpl.jpg',
          comments: 'Tokyo Joe will be here @ 7 on Fri',
          expiration: 1482012234425,
          category: 3,
        }),
        knex('foods').insert({
          id: 14,
          user_id: 12,
          image_url: 'https://res.cloudinary.com/dgt2xab7d/image/upload/v1481753056/aqec0rvtx50jk4hm47ds.jpg',
          comments: 'Enjoy!',
          expiration: 1482012541693,
          category: 2,
        }),
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('foods_id_seq', (SELECT MAX(id) FROM foods))");
    });
};
