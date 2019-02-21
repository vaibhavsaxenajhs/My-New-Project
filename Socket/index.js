const express = require('express');
const APP = express();
const socket = require('socket.io');

APP.use(express.static('public'));

const SERVER = APP.listen(8023, function(){
  console.log("App is running on port number : 8023");
});

const io = socket(SERVER);

io.on('connection',function(socket){
  console.log('Connection done with ID: '+socket.id);
  console.log(socket.handshake.address);
  
  socket.on('chat', function(data){
      data.IP=""+socket.handshake.address;      
      io.sockets.emit('chat',data);
  });
});