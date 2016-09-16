var chance = require('chance').Chance();

module.exports = function(server, db){
  var io = require('socket.io')(server);
  io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('server_says', 'You are connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
};
