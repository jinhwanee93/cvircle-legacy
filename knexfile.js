// Update with your config settings.
const dotenv = require('dotenv');
dotenv.load();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'cvircle',
      user: 'root',
    },
    pool: {
      min: 1,
      max: 1
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: { 
      min: 5,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};