exports.up = function(knex, Promise){
  return knex.schema.createTable('ratings', function(table){
    table.increments();
    table.integer('user_id');
    table.timestamp('date');
    table.integer('rate');
    table.integer('rater_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
