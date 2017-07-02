const net = require('net');

var name = Math.floor(Math.random() * 1000) + 1


//const socket = net.connect({port: '6969', host: '0.0.0.0'});

const socket = net.connect(6969, '0.0.0.0', () => {
  console.log("client connected");
  //socket.write("socket.write: hello");
});

socket.setEncoding('utf8');

socket.on('data', function(data){
  console.log("msg: ",data);
  //socket.destroy();
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    //process.stdout.write("stdout: "+chunk);
    socket.write("RandoMan"+name+' '+chunk);
  }
});

// proc.stdin.on('end', () => {
//   proc.stdout.write('the end');
// });

socket.on('close', () => {
  console.log("connection closed");
});