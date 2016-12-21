'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.integer('facebook_id').notNullable().defaultTo(0);
    table.integer('facebook_token').notNullable().defaultTo('');
    table.string('imgUrl').notNullable().defaultTo('');
    table.string('bio').defaultTo('');
    table.string('instruments').defaultTo('');
    table.string('project_type').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
}
