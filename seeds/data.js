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
        phoneNumber: 1234567890
      }).returning('id'),
      knex('users').insert({
        email: 'user2@email.com',
        firstName: 'firstName2',
        lastName: 'lastName2',
        password: 'password',
        phoneNumber: 8592403279
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
        paymentAmount: 50.00,
        paymentType: 'cash',
        lat: 40.616488,
        lng: -105.054672,
        address: '2608 Greenmont Drive, Fort Collins, CO 80524, USA'
      }).returning('id'),
      knex('fetches').insert({
        item: 'two bottle of champagne',
        dateRequested: '2016-1-15 13:59:17 -0600',
        dateClaimed: '2016-1-15 23:59:17 -0600',
        dateClosed:  '2016-1-16 23:59:17 -0600',
        requestor_id: 1,
        claimor_id: 2,
        paymentAmount: 50.00,
        paymentType: 'bitcoin',
        lat: 40.582008,
        lng: -105.075115,
        address: '418 Remington St, Fort Collins, CO 80524, USA'
      }).returning('id'),
      knex('fetches').insert({
        item: '1 case of Odell IPA',
        dateRequested: '2016-1-14 13:59:17 -0600',
        dateClaimed: '2016-1-30 23:59:17 -0600',
        requestor_id: 2,
        claimor_id: 1,
        paymentAmount: 30.00,
        paymentType: 'stripe',
        lat: 40.598873,
        lng: -105.072170,
        address: '909 Blondel St, Fort Collins, CO 80524, USA'
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
