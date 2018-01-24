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
  socket.write(`\tWelcome use /help for instructions\n`);

  socket.on('data', function(data) {
    //console.log('data back from cmd module', cmd.showData(data));
    let toEmit = cmd.showData(data);
    socket.emit(toEmit.command, toEmit);

  });

  socket.on('list', function() {
    clientPool.map(c => socket.write(`\t${c.nick}\n`));
  });

  socket.on('dm', function(obj) {
    let clientToMessage = obj.recipient;
    let client1 = clientPool.filter(c => c.nick === clientToMessage);
    client1[0].socket.write(`${obj.message}`);
  });

  socket.on('nick', function(obj) {
    client.nick = obj.newNick;
    client.socket.write(obj.message);

  });

  socket.on('help', function() {
    socket.write(`\ttype /quit to quit \n
    \t /dm <recipient name> <message> \n
    \t/list <to list current users>\n
    \t/nick <new nick name> to change nickname\n
    \t/help for this list\n
    \tregular typing will broadcast on <enter>\n`);

  });

  socket.on('broadcast', function(obj) {

    clientPool.map(c => c.socket.write(`\t${obj.message}\n`));
  });



  socket.on('quit', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the conversation\n`));
    socket.end();
  });


  socket.on('error', function(obj) {
    socket.write(`\t${obj.message}\n`);
  });

});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
