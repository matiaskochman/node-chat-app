$(document).ready(function(){
  var socket = io();

  socket.on('connect', function(){
    console.log("Client connected.")

  });
  socket.on('disconnect', function() {
    console.log("Client disconnected.")
  });
  socket.on('newMessage',function(message){
    console.log(message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
  });

  socket.on('newLocationMessage',function(message){
    console.log('pekerman 1')
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
  })

  var messageTextBox = $('[name=message]');
  $("#message-form").on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
      from:'User',
      text:messageTextBox.val().toString()
    });

    messageTextBox.val('');
  });

  var locbutton = $("#send-location");

  locbutton.on('click',function(){
    if(!navigator.geolocation){
      return alert("Geolocation not supported for your browser");
    }

    locbutton.attr('disabled','disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position){

      locbutton.removeAttr('disabled').text('Send location');
      var position = {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      }

      socket.emit('createLocationMessage',position);
      //console.log(position);
    },function(){
      locbutton.removeAttr('disabled').text('Send location');
      console.log('unable to fetch postion');
    })
  });
});
