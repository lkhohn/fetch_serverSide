
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id').primary();
    table.string('email', 255);
    table.text('firstName', 255);
    table.text('lastName', 255);
    table.text('password', 50);
    table.text('phoneNumber', 12);
    table.integer('zipCode', 5);
    table.integer('ranking', 5);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
