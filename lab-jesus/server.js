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

  // Shows message to all users but user that joined
  clientPool.filter(
    c => c.user !== client.user).map(
    c => c.socket.write(`\t${client.nick} has joined\n`));

  // Shows message only to user that joined
  clientPool.filter(
    c => c.user === client.user).map(
    c => c.socket.write(`\tWelcome ${client.nick}\n`));


  socket.on('data', function(data) {
    // console.log('socket data', data)
    let message = data.toString().trim();
    console.log(message);
    if(message.startsWith('@')){
      let wordArray = message.split(' ');

      if(wordArray[0] === '@nickname') {
        client.nick = wordArray[1];
        socket.write(`Success!\nYour nickname has been changed to '${client.nick}'.\n`);
        return;
      }

      if (wordArray[0] === '@quit'){
        socket.write('Goodbye!\n');
        socket.end();
        return;
      }

      if (wordArray[0]=== '@list'){
        socket.write(`User List: \n`);
        clientPool.map(c => socket.write(`${c.nick}\n`));
        return;
      }

      if (wordArray[0] === '@dm') {
        let nick = wordArray[1];
        clientPool.forEach(c => {
          if (c.nick === nick) {
            c.socket.write(`${client.nick}: ${wordArray.slice(2).join(' ')}\n`);
          }
        });
        return;
      }
    }
    clientPool.filter(
      c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${message}\n`));
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