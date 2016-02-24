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


exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_scouts', function(table){
    table.string('user_id')
    .refrences('user_id')
    .inTable('users')
    .onUpdate('cascade')
    .onDelete('cascade');
    table.string('scout_id')
    .references('scout_id')
    .inTable('scouts')
    .onUpdate('cascade')
    .contraint('users_scouts_pkey')
    .primaryKey('user_id', 'scout_id');
  });
};
exports.down = function(knex, Promise){
  return knex.schema.dropTable('user_scouts');
};

 // DROP TABLE users_scouts;
 // CREATE TABLE users_scouts (
 //   user_id    int REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
 //   requestedScout_id int REFERENCES requestedScouts (requestedScout_id) ON UPDATE CASCADE,
 //   CONSTRAINT users_scouts_pkey PRIMARY KEY (user_id, requestedScout_id)
 // );
