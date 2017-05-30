var socket = io();

socket.on('connect', function(){
  console.log("Client connected.")

  socket.emit('createMessage',{
    to:'Matias',
    text:'no anda la camioneta'
  });
});
socket.on('disconnect', function() {
  console.log("Client disconnected.")
});
socket.on('newMessage',function(message){
  console.log(message);
});
