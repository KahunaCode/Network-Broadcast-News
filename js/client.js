const net = require('net');

//const socket = net.connect({port: '6969', host: '0.0.0.0'});

const socket = net.connect(6969, '0.0.0.0', function(){
  console.log("client connected");
  socket.write("hellloooooo");
});

socket.setEncoding('utf8');

socket.on('data', function(data){
  console.log("rx'd ",data);
  //socket.destroy();
});

socket.on('close', () => {
  console.log("connection closed");
});