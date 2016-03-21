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


// router.get('/userHistory', function(req, res, next){
//   knex('fetches')
//   .where({requestor_id: req.user.id})
//   .join('users', users.id, fetches.requestor_id)
//   // .select(users.id, users.email, users.firstName);
//   // .select(fetches.*, users.id, users.email, "users"."firstName", "users"."lastName", "users"."phoneNumber")
// })
// .then(function(data,err){
//   // if(!checkErr(res, err)){
//     res.send(data);
//   // }
//   });
// })

module.exports = router;
