console.log('done');

import io from 'socket.io-client';
import Chance from 'chance';
var chance = Chance.Chance();

window.global = window;
var g = {};
window.g = g;


var socket = io();
g.socket = socket;
g.path = __dirname;

g.userId = false;

socket.on('connect', function(){
  socket.on('connected', function(userId){


    console.log('userId', userId);
    g.userId = userId;
    socket.on('server_says', function(msg){
      console.log('server_says', msg);
    });

    //console.log('testing server communication');
    var number = chance.d20();
    //console.log('number:', number );
    //socket.emit('test', number);

    socket.emit('db_set', {
      userId: g.userId,
      doc: {
        status: 'this is a test'
      }
    });



  });
});
