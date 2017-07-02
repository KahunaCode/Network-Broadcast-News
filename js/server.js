const net = require('net');

var client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress+' '+c.remotePort+' now connected');

  var nameChosen = false;

  //client_list.push(c);

  //get data from client socket, then pass to other clients
  c.on('data', function(data) {
      process.stdout.write(data);
      if (nameChosen === false){
        var nick = data.toString();

        client_list.push({
          nickname:nick,
          socket:c
        });

        console.log(client_list);
        nameChosen = true;
      }
      //look for server commands that start with '/'
      // var slash = data.toString().split(' ')[1];
      // if (slash === '/nick') {
      //   var nick = data.toString().split(' ')[2];
      //   console.log("changing nickname to: "+nick);
      //   client_list.push({nick:c});
      //   console.log(client_list);
      // }

      //console.log(data);
      client_list.forEach(function(client){
        //console.log(client.socket);
        if (client.socket === c) return;
        if (client.nickname){
          var nn = client.nickname;
          client.socket.write(nn+': '+data);
        }else{
          client.socket.write(data);
        }

        //client.socket.write(nn+': '+data);
      });



      // client_list.forEach(function(client){
      //   for (var p in client.socket){
      //     if (client.socket.hasOwnProperty(p)){
      //       console.log("p is", p);
      //       if (p === c) return;
      //       p.write(data);
      //     }
      //   }
      // });
    });

  //broadcast Admin messages
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

  c.write('Welcome to JChat. Enter nickname:\r\n');
  });

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log('server bound');
});

