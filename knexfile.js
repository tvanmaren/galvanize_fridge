'use strict';
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize_fridge',
    secret: 'ilovescotchyscotch'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    secret: 'ilovescotchyscotch'
  }
};
