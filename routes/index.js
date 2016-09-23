var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var http = require('http').Server(express);
var io = require('socket.io')(http);

router.get('/availableFetches', function(req, res, next) {
  knex('fetches').select()
  .then(function(data, err) {
    res.json(data);
  });
});

module.exports = router;
