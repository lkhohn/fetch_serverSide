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


router.post('/signup', function(req, res, next) {
  var user = req.body;
  hashPassword(user, registerUser);

  function registerUser(user){
    knex('users').insert({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      zipCode: user.zipCode
    })
    .returning('id')
    .then(function(data, err){
      if(!checkErr(res, err)){
        res.send('success');
      }
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



router.post('/signin', function(req, res, next) {
  knex('users').first().where({
    email: req.body.email
  }).then(function(data, err){
    if(!checkErr(res, err)){
      bcrypt.compare(req.body.password, data.password, function(err, match){
        if(match){
          var user = data;
          delete user.password;
          var expires = {
            expiresInMinutes : 1600
          };
          var token = jsonWebToken.sign(user, secret, expires);
          res.json({token : token});
          res.end('End');
        } else {
          res.send('failed to authenicate');
        }
      });
    }
  });
});


module.exports = router;
