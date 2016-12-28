'use strict';

exports.seed = function(knex) {
  return knex('user_messages').del()
    .then(() => {
      return knex('user_messages').insert([{
        id: 1,
        user_id: 1,
        match_id: 2,
        message_body: 'AYYYYYYY WUSS GOOD LETS JAM',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM user_messages));"
      );
    });
};
