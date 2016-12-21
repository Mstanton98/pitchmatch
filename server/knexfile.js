'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pitchmatch_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
