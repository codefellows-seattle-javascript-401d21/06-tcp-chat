'use strict';

// Application dependencies
const Client = require('./model/client');
const commands = require('./lib/commands');
const net = require('net');
const EE = require('events').EventEmitter;
const ee = new EE();
let sockets = [];


// Application setup
const server = module.exports = net.createServer();
// console.log(server)
const PORT = process.env.PORT || 3000;
let clientPool = [];












// Server setup
server.on('connection', socket => {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.user} has joined the channel.\n`));

  socket.on('data', data => {
    let message = data.toString();
    clientPool.map(c => c.socket.write(`${client.nick}: ${message}`));
  });

  socket.on('close', (hadErr) => {
    if (hadErr) {
      socket.emit('error', new Error('There be a problem'));
      client.socket.write(`There was an issue: ${err.message}\n`);
      return;
    }


    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.user} has left the channel\n`));
    console.log(clientPool);
  });
  socket.on('error', err => console.error(err));
});

server.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
