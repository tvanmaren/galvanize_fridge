'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('food', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.string('image_url').defaultTo('https://goo.gl/CWVE6o');
    table.text('comments').notNullable().defaultTo('');
    table.boolean('active').defaultTo(true);
    table.integer('category').defaultTo(1).references('id').inTable('categories').onDelete('CASCADE').index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('food');
};
