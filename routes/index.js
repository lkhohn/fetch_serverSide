var express = require('express');
var router = express.Router();
var knex = require('../db/knex');





router.get('/availableFetches', function(req, res, next){
  knex('fetches').select()
  .then(function(data, err){
    // if(checkErr(res, err)){
      res.json(data);
    // }
  });
});


module.exports = router;
