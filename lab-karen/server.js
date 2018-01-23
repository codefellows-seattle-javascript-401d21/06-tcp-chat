'use strict';
//this file sets up a TCP server a chatroom

// Application dependencies
const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

// Application setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

// Server instance setup
server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the chat\n`));

  socket.on('data', function(data) {
    // This is where user input is received
    cmd(data, clientPool);

  });

  socket.on('list', function () {
    client.socket.write('\n\tConnected Users:\n');
    clientPool.map(c => client.socket.write(`\n\t${c.nick}\n`));
  });


  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the chat\n`));
  });

  socket.on('error', function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
