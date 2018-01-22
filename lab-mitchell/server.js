'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
const clientPool = [];

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the channel\n`));

  socket.on('data', function(data) {

  });

  socket.on('close', function() {

  });

  socket.on('error', function(err) {

  });



server.listen(PORT, () => console.log(`Listening on ${PORT}`));