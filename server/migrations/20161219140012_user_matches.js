'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('user_matches', (table) => {
    table.increments();
    table.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .index();
    table.integer('match_id')
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .index();
    table.boolean('is_match').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_matches');
}
