const net = require('net');

//const socket = net.connect({port: '6969', host: '0.0.0.0'});

const socket = net.connect(6969, '0.0.0.0', () => {
  console.log("client connected");
  //socket.write("socket.write: hello");
});

socket.setEncoding('utf8');

socket.on('data', function(data){
  console.log("rx'd ",data);
  //socket.destroy();
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write("stdout: "+chunk);
    socket.write(chunk);
  }
});

// proc.stdin.on('end', () => {
//   proc.stdout.write('the end');
// });

socket.on('close', () => {
  console.log("connection closed");
});