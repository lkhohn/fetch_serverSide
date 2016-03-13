var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[en vironment];
module.exports = require('knex')(config);
