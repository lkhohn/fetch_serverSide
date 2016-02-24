var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var pg = require('pg');
var knex = require('../db/knex');


// router.get('/', function(req, res, next){
//   if(req.session.user){
//     res.send('not a req.session');
//   } else{
//     res.render('signup');
//   }
// });

// router.get('/', function(req, res, next){
//   res.render('signup');
// });

// router.post('/', function(req, res, next){
//   console.log('signup express route' + req.body);
//     var newUser = req.body;
//     hashPassword(newUser, registerUser);
//     function registerUser(){
//     knex('users').insert({
//       username: req.body.username,
//       password: req.body.password
//     }).then(function(data){
//       // good idea to redirect user to signin page and give them a session cookie then.
//       res.send('this worked');
//       // res.redirect('/users/signin');
//     });
//   }
//     function hashPassword(user, callback){
//       bcrypt.genSalt(10, function(err, salt) {
//           bcrypt.hash(user.password, salt, function(err, hash) {
//             user.password = hash;
//             callback(user);
//       });
//     });
//   }
// });










module.exports = router;
