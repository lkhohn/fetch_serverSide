exports.up = function(knex, Promise) {
  return knex.schema.createTable('fetches', function(table){
    table.increments();
    table.text('item', 1000);
    table.timestamp('dateRequested');
    table.timestamp('dateClaimed');
    table.timestamp('dateClosed');
    table.integer('requestor_id');
    table.integer('claimor_id');
    table.decimal('paymentAmount', 100);
    table.text('paymentType');
    table.integer('zipCode', 5);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fetches');
};
