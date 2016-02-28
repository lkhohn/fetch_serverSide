var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var pg = require('pg');
var knex = require('../db/knex');


/* get all the fetches */
router.get('/fetches', function(req, res, next){

});

/* add a new fetch */
router.post('/new', function(req, res, next){
  knex('fetches').insert({
    item: req.body.item,
    paymentAmount: req.body.paymentAmount,
    paymentType: req.body.paymentType,
    zipCode: req.body.zipCode
    // dateRequested:
    // dateClaimed:
    // equestor_id:
    // claimor_id:
  });
});

/* claim a fetch -- update fetch information */
router.put('/claim', function(req, res, next){

});

module.exports = router;
