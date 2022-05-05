exports.up = function (knex) {
  return knex.schema.createTable('fields', (table) => {
    table.increments('id').primary();
    table.integer('game_id').references('game.id');
    table.jsonb('field_1'); //{user_id: [[][]], user_id: [[][]]}
    table.jsonb('field_2'); //{}

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {};
