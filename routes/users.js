var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var pg = require('pg');
var knex = require('../db/knex');


router.post('/signup', function(req, res, next){
  var newUser = req.body;
  hashPassword(newUser, registerUser);
  function registerUser(){
    knex('users').insert({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode
  }).then(function(data){
    res.send(data);
  });
}
  function hashPassword(user, callback){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash){
        user.password = hash;
        callback(user);
        });
      });
    }
});


router.post('/signin', function(req, res, next){
  // console.log(req.body);
  knex('users').first().where({
    username: req.body.username
  }).then(function(user){
    bcrypt.compare(req.body.password, user.password, function(err, match){
      if(match){
        // req.session.user equal to everything you got back form db (its an object) from the previous user query
        req.session.user = user;
        // delete key value pair for password
        delete req.session.user.password;
        res.status = 200;
        res.end();
      } else {
        res.send('incorrect');
      }
    });
  });
});

module.exports = router;
