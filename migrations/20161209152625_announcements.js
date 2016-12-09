'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTbale('announcements', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.text('content').notNUllable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('announcements');
};
