'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

server.on('connection', function(socket) {

  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the conversation\n`));

  socket.on('data', function(data) {
    let text = cmd.showData(data);
    socket.emit(text.command, text);
  });

  socket.on('list', function() {
    socket.write(`connected users\n`);
    clientPool.map(clint => socket.write(`\t${clint.nick}\n`));
  });

  socket.on('dm', function(obj) {
    let clientToMessage = obj.recipient;
    let client1 = clientPool.filter(clint => clint.nick === clientToMessage);
    client1[0].socket.write(`${client1[0].nick}: ${obj.message}\n`);
  });

  socket.on('cn', function(obj) {
    let oldName = client.nick;
    client.nick = obj.newNick;
    socket.write(`${oldName} in now "${client.nick}"\n`);
  });


  socket.on('quit', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the conversation\n`));
    socket.end();
  });

  socket.on('message', function(data) {
    clientPool.filter(
      c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${data.message}\n`));
  });

  socket.on('error', function() {
    console.err(err);


  });

});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
