'use strict'

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
const clientPool = [];

server.on('connection', function (socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the chat\n`))

  socket.on('data', function (data) {
    let message = data.toString();
    clientPool.filter(c => c.user !== client.user)
        .map(c => c.socket.write(`${client.nick}: ${message}\n`))
    client.socket.write(`You Said: ${message}\n`)

  });

  socket.on('close', function () {
    clientPool = clientPool.filter(c => c.user !== client.user)
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the chat\n`))

  });

  socket.on('error', function (err) {
    client.socket.write(`\t\t!!!\tError\t!!!:\n ${err}\n`)

  });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));