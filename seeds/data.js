'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('fetches').del(),
    knex('ratings').del()
  )
  .then(function() {
    return Promise.join(
      knex('users').insert({
        email: 'user1@email.com',
        firstName: 'firstName1',
        lastName: 'lastName1',
        password: 'password',
        phoneNumber: 1234567890,
        zipCode: 80524
      }).returning('id'),
      knex('users').insert({
        email: 'user2@email.com',
        firstName: 'firstName2',
        lastName: 'lastName2',
        password: 'password',
        phoneNumber: 1234567890,
        zipCode: 80525
      }).returning('id')
    );
  })
  .then(function() {
    return Promise.join(
      knex('fetches').insert({
        item: 'dry cleaning',
        dateRequested: '2016-1-28 23:59:17 -0600',
        dateClaimed: '2016-1-29 23:59:17 -0600',
        dateClosed:  '2016-1-30 23:59:17 -0600',
        requestor_id: 1,
        claimor_id: 2,
        paymentAmount: 100.00,
        paymentType: 'cash',
        zipCode: 80524,
        lat: 40.6164880,
        lng: -105.0546720
      }).returning('id'),
      knex('fetches').insert({
        item: 'random things',
        dateRequested: '2016-1-15 13:59:17 -0600',
        dateClaimed: '2016-1-15 23:59:17 -0600',
        dateClosed:  '2016-1-16 23:59:17 -0600',
        requestor_id: 1,
        claimor_id: 2,
        paymentAmount: 50.00,
        paymentType: 'bitcoin',
        zipCode: 80524,
        lat: 40.6000023,
        lng: -105.0728681
      }).returning('id'),
      knex('fetches').insert({
        item: 'a job',
        dateRequested: '2016-1-14 13:59:17 -0600',
        dateClaimed: '2016-1-30 23:59:17 -0600',
        requestor_id: 2,
        claimor_id: 1,
        paymentAmount: 20.00,
        paymentType: 'stripe',
        zipCode: 80525,
        lat: 40.5820133,
        lng: -105.0750997
      }).returning('id')
    );
  })
  .then(function(){
    return Promise.join(
      knex('ratings').insert({
        user_id: 1,
        date: '2016-1-14 13:59:17 -0900',
        rate: 3,
        rater_id: 2
      }).returning('id'),
      knex('ratings').insert({
        user_id: 2,
        date: '2016-1-15 13:59:17 -0900',
        rate: 3,
        rater_id: 1
      }).returning('id')
    );
  });
};
