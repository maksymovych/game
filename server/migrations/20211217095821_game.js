exports.up = function (knex) {
  return knex.schema.createTable('game', (table) => {
    table.increments('id').primary().notNullable();
    table.string('user1').references('user_db.id');
    table.string('user2').references('user_db.id');
    table.string('status'); //game status = [created, started, finished, canceled]
    table.string('winner'); // user_id
    table.integer('steps_amount');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('game');
};
