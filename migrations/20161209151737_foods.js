'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.string('image_url').defaultTo('https://goo.gl/CWVE6o');
    table.text('comments').notNullable().defaultTo('');
    table.decimal('expiration', 1000, 0).notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods');
};
