const net = require('net');

const server = net.createServer((c) => {
  console.log(c.remoteAddress+' '+c.remotePort+' now connected');

  c.on('data', function(data) {
      c.write(data);
      process.stdout.write(data);
      //console.log("data is "+ data);
    });

  c.on('end', () => {
    console.log(c.remoteAddress+' '+c.remotePort+' disconnected');
  });

  c.write('hello from server\r\n');
  c.pipe(c);
});

server.on('error', (err) => {
  throw err;
});


server.listen(6969, '0.0.0.0', () => {
  console.log('server bound');
});

