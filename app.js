require('dotenv').load();

var express = require('express');
var http = require('http').Server(express);
var io = require('socket.io')(http);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jsonWebToken = require('jsonwebtoken');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var fetches = require('./routes/fetches');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var corsOptions = {
  origin: 'http://localhost:8100',
  withCredentials: true
};
app.use(cors(corsOptions));

var secret = "CHANGETOENV";

app.use('/', routes);
app.use('/users', users);
app.use('/fetches', jwt({secret:secret}), fetches);


// socket.io
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});



http.listen(2000, function(){
    console.log('Listening on port 2000');
});




io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// io.on('connectFindFetch', function(socket){
//   socket.on('new fetch', function(data){
//     socket.get('fetchDetails', function(err, key){
//       var fetch = fetchDetails[key];
//       socket.broadcast.emit("fetch update", data);
//
//     });
//   });
// });
// socket.on('getFetches', function(sendData){
//   sendData =
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
