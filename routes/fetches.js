var express = require('express');
var router = express.Router();

var knex = require('../db/knex');


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
  knex('fetches').where({requestor_id: req.user.user_id})
  .then(function(data, err){
    if(!checkErr(res, err)){
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
    paymentType: newFetch.paymentType,
    zipCode: newFetch.zipCode,
    dateRequested: date,
    requestor_id: req.user.user_id
  })
  .then(function(data, err){
    if(!checkErr(res, err)){
      res.send('success');
    }
  });
});



router.get('/:fetch_id', function(req, res, next){
  knex('fetches').where({fetch_id: req.params.fetch_id})
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

router.put('/claim/:fetch_id', function(req, res, next) {
  var date = new Date();
  knex('fetches').where({fetch_id: req.params.fetch_id})
  .update({
      item: req.body.item,
      paymentAmount: req.body.paymentAmount,
      paymentType: req.body.paymentType,
      zipCode: req.body.zipCode,
      dateClaimed: date,
      claimor_id: req.user.user_id
    })
  .then(function(data, err) {
    if(!checkErr(res, err))
    {
      res.send('success');
    }
  });
});










module.exports = router;
