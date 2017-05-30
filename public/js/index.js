var socket = io();

socket.on('connect', function(){
  console.log("Client connected.")

});
socket.on('disconnect', function() {
  console.log("Client disconnected.")
});
socket.on('newMessage',function(message){
  console.log(message);
});
