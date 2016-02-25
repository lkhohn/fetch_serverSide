exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id').primary();
    table.string('email');
    table.string('firstName');
    table.string('lastName');
    table.string('password');
    table.string('phoneNumber');
    table.string('zipCode');
    table.string('preferredPayment');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('scouts', function(table){
    table.increments('scout_id').primary();
    table.timestamps('dateRequested');
    table.timestamps('dateClaimed');
    table.string('requestor_id');
    table.string('claimor_id');
    table.integer('paymentAmount');
    table.string('paymentType');
    table.string('zipCode');
  });
};
 exports.down = function(knex, Promise) {
   return knex.schema.dropTable('scouts');
 };
