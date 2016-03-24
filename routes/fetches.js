var express = require('express');
var jsonWebToken = require('jsonwebtoken');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

var http = require('http').Server(express);
var io = require('socket.io')(http);


var secret="CHANGETOENV";



function checkErr(res, err){
  var fail = false;
  if(err){
    fail = true;
    res.send(err);
  }
  return fail;
}


/* get all the fetches */
router.get('/', function(req, res, next){
  // console.log(req.user.id)
  // console.log(data)
  knex('fetches').select()
  .where({requestor_id: req.user.id})
  .then(function(data, err){
    if(!checkErr(res, err)){
      // console.log(data);
      res.json(data);
    }
  });
});


/* add a new fetch */
router.post('/', function(req, res, next){
  var newFetch = req.body;
  var date = new Date();
  knex('fetches').insert({
    item: newFetch.item,
    paymentAmount: newFetch.paymentAmount,
    paymentType: "cash",
    // paymentType: newFetch.paymentType,
    zipCode: newFetch.zipCode,
    lat: newFetch.lat,
    lng: newFetch.lng,
    dateRequested: date,
    requestor_id: req.user.id,
    address: newFetch.address
  })
  .then(function(data, err){
    if(!checkErr(res, err)){
      globalObject.socketServer.emit('update', {
        item: newFetch.item,
        paymentAmount: newFetch.paymentAmount,
        paymentType: "cash",
        // paymentType: newFetch.paymentType,
        zipCode: newFetch.zipCode,
        lat: newFetch.lat,
        lng: newFetch.lng,
        dateRequested: date,
        requestor_id: req.user.id,
        address: newFetch.address
      });
      res.send('success');
    }
  });
});

router.get('/userHistory', function(req, res, next){
  knex('fetches').select()
  .where({claimor_id: req.user.id})
  // .join('users', users.id, fetches.requestor_id)
  // .select(users.id, users.email, users.firstName);
  // .select(fetches.*, users.id, users.email, "users"."firstName", "users"."lastName", "users"."phoneNumber")
.then(function(data, err){
  if(!checkErr(res, err)){
    res.json(data);
  }
  });
});


router.put('/claim', function(req, res, next) {
  var date = new Date();
  // console.log(req.user);
  knex('fetches').where({id: req.body.id})
  .update({
      item: req.body.item,
      paymentAmount: req.body.paymentAmount,
      paymentType: req.body.paymentType,
      zipCode: req.body.zipCode,
      dateClaimed: date,
      claimor_id: req.user.id
    })
  .then(function(data, err) {
    if(!checkErr(res, err))
    {
      globalObject.socketServer.emit('claimOrClose', {
        item: req.body.item,
        paymentAmount: req.body.paymentAmount,
        paymentType: req.body.paymentType,
        zipCode: req.body.zipCode,
        dateClaimed: date,
        claimor_id: req.user.id
      });
      res.send('success');
    }
  });
});

router.put('/close', function(req, res, next) {
  var date = new Date();
  knex('fetches').where({id: req.body.id})
  .update({
    dateClosed: date
  })
  .then(function(data, err) {
    if(!checkErr(res, err))
    {
      globalObject.socketServer.emit('claimOrClose', {
        dateClosed: date
        item: newFetch.item,
        paymentAmount: newFetch.paymentAmount,
        paymentType: "cash",
        // paymentType: newFetch.paymentType,
        zipCode: newFetch.zipCode,
        lat: newFetch.lat,
        lng: newFetch.lng,
        dateRequested: date,
        requestor_id: req.user.id,
        address: newFetch.address
      });
      res.send('success');
    }
  });
});



module.exports = router;
