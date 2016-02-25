'use strict';


exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('fetches').del()
  )
  .then(function() {
    return Promise.join(
      knex('users').insert({
        email: 'user1@email.com',
        password: 'password',
        firstName: 'firstName1',
        lastName: 'lastName1',
        phoneNumber: 1234567890,
        zipCode: 80524
      }).returning('id'),
      knex('users').insert({
        email: 'user2@email.com',
        password: 'password',
        firstName: 'firstName2',
        lastName: 'lastName2',
        phoneNumber: 2345678901,
        zipCode: 80525
      }).returning('id')
    );
  }).then(function() {
    return Promise.join(
      knex('fetches').insert({
        item: 'dry cleaning',
        dateRequested: '2016-1-28 23:59:17 -0600',
        dateClaimed: '2016-1-29 23:59:17 -0600',
        requestor_id: 1,
        claimor_id: 2,
        paymentAmount: 100.00,
        paymentType: 'cash',
        zipCode: 80524
      }).returning('id'),
      knex('fetches').insert({
        item: 'random things',
        dateRequested: '2016-1-15 13:59:17 -0600',
        dateClaimed: '2016-1-15 23:59:17 -0600',
        requestor_id: 1,
        claimor_id: 2,
        paymentAmount: 50.00,
        paymentType: 'bitcoin',
        zipCode: 80524
      }).returning('id'),
      knex('fetches').insert({
        item: 'a job',
        dateRequested: '2016-1-14 13:59:17 -0600',
        dateClaimed: '2016-1-30 23:59:17 -0600',
        requestor_id: 2,
        claimor_id: 1,
        paymentAmount: 20.00,
        paymentType: 'stripe',
        zipCode: 80525
      }).returning('id')
    );
  });
};
