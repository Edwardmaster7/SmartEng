const path = require('path');

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    }
  }
};
