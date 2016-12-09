'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('announcements', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.text('content').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('announcements');
};
