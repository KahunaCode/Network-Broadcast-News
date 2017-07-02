const net = require('net');

var client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress+' '+c.remotePort+' now connected');

  client_list.push(c);
  console.log("client list is :" + client_list);

  c.on('data', function(data) {
      //c.write(data);
      client_list.forEach(function(client){
        process.stdout.write(data);
        client.write(data);
      });
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

