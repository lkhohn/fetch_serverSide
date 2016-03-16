var express = require('express');
var jsonWebToken = require('jsonwebtoken');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


var secret="CHANGETOENV";

router.get('/availableFetches', function(req, res, next){
  knex('fetches').select()
  .then(function(data, err){
    // if(checkErr(res, err)){
      res.json(data);
    // }
  });
});
module.exports = router;
