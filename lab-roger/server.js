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
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the conversation\n`));

  socket.on('data', function(data) {
    cmd.showData(data);

  })



  // socket.on('close', function() {
  //   clientPool  = clientPool.filter(c => c.user !== client.user);
  //   clientPool.map(c => c.socket.write(`\t${client.nic} has let the conversation\n`));
  // })

  // socket.on('error', function() {
  //   console.err(err);
  //
  //
  // })

});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
