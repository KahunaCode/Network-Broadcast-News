const net = require('net');

var client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress+' '+c.remotePort+' now connected');

  client_list.push(c);

  c.on('data', function(data) {
      process.stdout.write(data);
      client_list.forEach(function(client){
        if (client === c) return;
        client.write(data);
      });
    });

  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      client_list.forEach(function(client){
        client.write("ADMIN:"+' '+chunk);
      });
    }
  });

  c.on('end', () => {
    console.log(c.remoteAddress+' '+c.remotePort+' disconnected');
    var toRemove = client_list.indexOf(c);
    client_list.splice(toRemove, 1);
    console.log("removed connection");
  });

  c.write('Welcome to JChat\r\n');
  });

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log('server bound');
});

