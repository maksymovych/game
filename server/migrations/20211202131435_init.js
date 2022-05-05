//to create the table users
exports.up = function (knex) {
  return knex.schema.createTable('user_db', (table) => {
    table.string('id').primary().notNullable();
    table.string('nickname').notNullable();
    table.string('name');
    table.integer('rate');
    table.string('email').notNullable().unique();
    table.string('password').notNullable().unique();
    table.string('token');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_db');
};
