var express = require('express');
var jsonWebToken = require('jsonwebtoken');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


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
    dateRequested: date,
    requestor_id: req.user.id
  })
  .then(function(data, err){
    if(!checkErr(res, err)){
      res.send('success');
    }
  });
});




router.get('/:fetch_id', function(req, res, next){
  knex('fetches').where({id: req.params.fetch_id})
  .then(function(data, err){
    if(!checkErr(res, err)){
      res.json(data);
    }
  });
});


router.delete('/:fetch_id', function(req, res, next) {
  knex('fetches').where({user_id : req.params.fetch_id}).del()
  .then(function(data, err) {
    if(!checkErr(res, err)){
      res.send('success');
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
      res.send('success');
    }
  });
});



// router.get('/user/:user_id', function(req, res, next){
//   knex('fetches').select().where({requestor_id: req.params.user_id})
//   .then(function(data, err){
//     if(!checkErr(res, err)){
//       res.json(data);
//     }
//   });
// });






module.exports = router;
