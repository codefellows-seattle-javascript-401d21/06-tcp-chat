'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 5000; 
let clientPool = []; //where logged in users are pushed to start chat

server.on('connection', function (socket) {
  let client = new Client(socket); //socket being the plug on when 'online'
  clientPool.push(client); 
  socket.write('Welcome ' + client.nickname + '!\n');
  clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the conversation.\n`));

  socket.on('data', function (data) {
    let message = data.toString();
    clientPool.filter(
      c => c.user !== client.user).map(
      c => c.socket.write(`${client.nickname}: ${message}\n`));
  });

  socket.on('data', function (data) {
    let msg = cmd(data, clientPool);
    socket.emit(msg.command, msg);
  });

  socket.on('close', function () {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nickname} has left the conversation.\n`));
  });

  socket.on('list', function () {
    client.socket.write('\n\tUsers:\n');
    clientPool.map(c => client.socket.write(`\n\t${c.nickname}\n`));
  });

  socket.on('nickname', function (data) {
    clientPool.map(c => c.socket.write(`\n\t\t${client.nickname} has changed their name to ${data.name}\n`));
    client.nickname = data.name;
  });

  socket.on('dm', function (data) {
    let who = clientPool.filter(c => c.nickname === data.name);
    who[0].socket.write(`\nFrom ${client.nickname}: ${data.said}\n`);
    client.socket.write(`\nTo ${data.name}: ${data.said}\n`);
  });

  socket.on('error', function (data) {
    client.socket.write(`\n${data.err}\n`);
  });
});
server.listen(PORT, () => console.log(`Listening on ${PORT}`));