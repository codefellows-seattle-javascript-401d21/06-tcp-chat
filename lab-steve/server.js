'use strict';

// Application dependencies
const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

// Application setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

// Server instance setup
server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the channel\n`));

  socket.on('data', function(data) {
    let info = cmd(data);
    socket.emit(info.action, info);
  });
   
  socket.on('list', () => {
    let n = 0;
    client.socket.write('\nConnected Users:');
    clientPool.map(c => {
      if (n % 4 === 0) client.socket.write(`\n\t`);
      client.socket.write(`${c.nick} `);
      n++;
    });
    client.socket.write('\n');
  });

  socket.on('nick', (data) => {
    client.nick = data.nickname;
    client.socket.write(`Changed nickname to ${client.nick}\n`);
  });

  socket.on('dm', (data) => {
    clientPool.map(c => {
      if (c.nick === data.who) c.socket.write(`${client.nick}: ${data.msg}\n`);
    });
  });

  socket.on('help', (data) => {
    client.socket.write(data.msg + '\n');
  });

  socket.on('broadcast', (data) => {
    clientPool
      .filter(c => c.user !== client.user)
      .map(c => c.socket.write(`${client.nick}: ${data.msg}\n`));
  });

  socket.on('quit', () => {
    client.socket.end();
  });

  socket.on('close', () => {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel\n`));
  });

  socket.on('error', (data) => {
    console.error(data.msg);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
