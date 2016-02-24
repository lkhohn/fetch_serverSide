// Update with your config settings.
require('dotenv').load();

// module.exports = {
//
//   development: {
//     client: 'pg',
//     connection: 'postgres://localhost/scout'
//   },
//
//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },
//
//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }
//
// };


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'scout'
    },
     migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
