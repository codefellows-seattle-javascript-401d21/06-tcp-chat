'use strict'

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

server.on('connection', function (socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the chat\n`))

  socket.on('data', function (data) {
    let msg = cmd(data, clientPool);
    console.log(msg);
    socket.emit(msg.command, msg);
  });

  socket.on('list', function () {
    client.socket.write('\tConnected Users:\n');
    clientPool.map (c =>  client.socket.write(`\t\t\t${c.nick}\n`));
  });

  socket.on('message', function (data) {
    let message = data.said;
    clientPool.filter(c => c.user !== client.user)
      .map(c => c.socket.write(`${client.nick}: ${message}\n`));
    client.socket.write(`You Said: ${message}\n`);
  });

  socket.on('nickname', function(data) {
    client.nick = data.name;
    console.log(clientPool);
  });

  socket.on('dm', function (data) {
    let who = clientPool.filter(c => c.nick === data.who);
    console.log('who', who)
    // who[0].socket.write(`Directly From ${client.nick}: ${data.said}`);
    // client.socket.write(`Directly To ${data.who}: ${data.said}`);
  });

  socket.on('close', function () {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the chat\n`));

  });

  socket.on('error', function (data) {
    client.socket.write(`\t\t!!!\tError\t!!!:\n ${data.err}\n`);

  });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));