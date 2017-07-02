const net = require('net');

var name = Math.floor(Math.random() * 1000) + 1

const socket = net.connect(6969, '0.0.0.0', () => {
  console.log("client connected");
});

socket.setEncoding('utf8');

socket.on('data', function(data){
  console.log("msg: ",data);
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    //process.stdout.write("stdout: "+chunk);
    socket.write("RandoMan"+name+' '+chunk);
  }
});

socket.on('close', () => {
  console.log("connection closed");
});