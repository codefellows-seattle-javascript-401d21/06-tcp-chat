'use strict';

const net = require('net');
const Client = require('./lib/client.js');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the channel\n`));

  socket.on('data', function(data) {
    // socket.end();
    cmd(data, clientPool, client, socket);
  });
  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel\n`));
  });
  socket.on('error', function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
