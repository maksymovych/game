// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");
const VARIABLES = require('./config/config');

module.exports = {
  development: {
    client: VARIABLES.DB_CLIENT,
    connection: {
      database: VARIABLES.DB,
      user: VARIABLES.DB_USER,
      password: VARIABLES.DB_PASSWORD,
      port: VARIABLES.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // tableName: 'user_db',
      directory: './migrations',
    },
    seeds: {
      directory: VARIABLES.SEEDS_DIRECTORY,
    },
    // automatically convert camelCase to snake case
    // so table names are in snake case
    // but we can use camelCase fields per default
    ...knexSnakeCaseMappers(),
  },
};
