'use strict';

// Application dependencies
const net = require('net'); 
const Client = require('./model/client');
const commands = require('./lib/commands');

// Application setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

// Server instance setup
server.on('connection', function (socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the party\n`));

  socket.on('data', function (data) {
    commands(data, clientPool, client, socket);
  });

  socket.on('close', function () {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} is gone\n`));
  });

  socket.on('error', function (err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
