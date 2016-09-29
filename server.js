var express = require('express');
var http = require('http');

var port = process.env.PORT || '3210';

var app = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

app.use(express.static(__dirname + '/public'));
//app.listen(port); // server.listen or app.listen ???

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
var db_collections = {
  testObj: {},
  testArray: [],
  users: []
};

var db = require('./server/db')('db', db_collections);
//db('posts').push({ title: 'lowdb test'});

require('./server/io')(server, db);

console.log('server started on http://localhost:'+port);
