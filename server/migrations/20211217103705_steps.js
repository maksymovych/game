exports.up = function (knex) {
  return knex.schema.createTable('steps', (table) => {
    table.increments('id').primary();
    table.integer('game_id').references('game.id');
    table.string('user_id').references('user_db.id');
    table.integer('x');
    table.integer('y');
    table.string('status'); //hit or not
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('steps');
};
