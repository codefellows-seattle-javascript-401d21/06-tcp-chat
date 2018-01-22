'use strict';

const net = require('net');
const Client = require('./lib/client.js');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
const clientPool = [];

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the channel`));

  socket.on('data', function(data) {
    cmd(data, clientPool, client);
    // let message = data.toString();
    // clientPool.filter(c => c.user !== client.user).map(
    //   c => c.socket.write(`${client.nick}: ${message}\n`)
    // );
  });
  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel`));
  });
  socket.on('error', function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
