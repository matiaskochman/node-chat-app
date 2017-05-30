const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');

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

  socket.on('createMessage', (message) => {
    console.log(message);

    io.emit('createMessage',generateMessage(message.from,message.text));
    // io.emit('newMessage', {
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })

    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })
  })
  socket.on('disconnect', () => {
    console.log("Client disconnected.")
  })
})


server.listen(port, () => {
  console.log(`Server is up in port ${port}`)
})
