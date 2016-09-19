var chance = require('chance').Chance();

module.exports = function(server, db){
  var io = require('socket.io')(server);
  io.on('connection', function(socket){
    var userId = chance.hash({length: 10});
    console.log('a user connected', userId);
    io.emit('connected', userId );
    db.set('users', {
      userId: userId
    });

    socket.on('test', function(input){
      console.log('test: ', input);
      io.emit('server_says', 'test, your input is: ' + input);
    });

    socket.on('db_set', function(submitted){
      console.log( userId, submitted.userId );

      if( userId === submitted.userId ){
        var doc = Object.assign({}, submitted.doc, {
          userId: submitted.userId
        });
        console.log('doc', doc);

      } else {
        console.log('user not identeified');
      }

      db.set('testArray', doc);

    });

    socket.on('db_get', function(){
      console.log('test');
      io.emit('server_says', 'test');
    });



    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

  });
};
