'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];


//basically add in a bunch of differet commands/events such as 
// server.on('list', function() {}
// server.on('quit', function() {}
// server.on('nickname', function() {}
// server.on('dm', function() {}

// also add things to them like client.socket.write('whatever the message should be');

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the channel\n`));

  socket.on('data', function(data) {
    //something about command parser module, CLI stuff with the different commands
    let msg = cmd(data, clientPool);
    socket.emit(msg.command, msg);

    // let message = data.toString();
    // clientPool.filter(
    //   c => c.user !== client.user).map(
    //     c => c.socket.write(`${client.nickname}: ${message}\n`));
  });

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nickname} has left the channel\n`));
  });

  socket.on('error', function(err) {
    console.error(err);
  });
});

//turn on server to listen for commands, this line logs to nodemon when running
server.listen(PORT, () => console.log(`Listening on ${PORT}`));