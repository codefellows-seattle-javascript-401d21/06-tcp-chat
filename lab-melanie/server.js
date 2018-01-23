'use strict';

// Application Dependencies
const net = require('net');
const Client = require('./model/client.js');
const cmd = require('./lib/cmd.js');

//Application Setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

// Server Instance Setup
server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined\n`));

  // Sends message to cmd.js
  socket.on('data', function(data) {
    let message = data.toString().trim();
    cmd(message, clientPool, client, socket)
  });

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
  });


  socket.on('error', function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));