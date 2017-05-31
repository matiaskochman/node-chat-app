const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log("new user conncected.");


  var welcomeMessage = generateMessage('Admin','welcome to the chat app');
  var broadcastMessage = generateMessage('Admin','new user joined');

  socket.emit('newMessage',welcomeMessage);
  socket.broadcast.emit('newMessage',broadcastMessage);

  socket.on('createMessage', (message,callback) => {
    console.log(message);

    io.emit('newMessage',generateMessage(message.from,message.text));


    //this is a bugfix
    if(typeof callback === "function") {
      callback('hola from server');
          //callback({data: ""});
    }

  });
  socket.on('createLocationMessage', (pos) => {
    console.log('pekerman 0')
    io.emit('newLocationMessage',generateLocationMessage('Admin',pos.latitude,pos.longitude));
  });
  socket.on('disconnect', () => {
    console.log("Client disconnected.")
  });
});


server.listen(port, () => {
  console.log(`Server is up in port ${port}`)
})
