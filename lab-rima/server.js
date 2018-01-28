'use strict';

// Application dependencies
const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

// Application setup
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 8888;
let clientPool = [];


// Server instance setup
server.on('connection', function(socket) {
  // create an instance of Client based on socket
  let client = new Client(socket);
  // save the client in an array
  clientPool.push(client);
  // write a welcome msg
  clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the chat!\n`));

  // When data is sent to the server, handles it
  socket.on('data', function(data) {
    try {
      // parse the data
      const command = cmd(data); 

      // quit
      if(command === 'Q'){
        console.log('Quit');
        client.socket.destroy();
      }
      // list all users
      else if(command === 'L'){
        console.log('list all users');
        client.socket.write('Here is all who are currently logged in!\n'); 
        clientPool.filter(c => c.user !== client.user).
          map(c => client.socket.write(`${c.nickname}`));
      }
      // msg to all
      else if(command === null){
        console.log('msg to all');
        clientPool.filter(c => c.user !== client.user)
          .map(c => c.socket.write(`${client.nickname}: ${data.toString()}\n`));
      }
      // change nickname
      else if(command.hasOwnProperty('newNN')){
        console.log('nickname change');
        client.nickname = command['newNN'];
      }
      // direct msg
      else if(command.hasOwnProperty('nickname') && command.hasOwnProperty('msg')){
        console.log('direct msg');
        console.log('cmd nick: ' + command['nickname']);
        let found = false;
        clientPool.forEach(function(c){
          console.log('client nick: ' + c.nickname + '    cmd nick: ' + command['nickname']);
          if(c.nickname == command['nickname']){
            console.log('in if');
            c.socket.write(`\t${client.nickname}: ${command['msg']}\n`);
            found = true;
          }
        });
        if(!found){
          client.socket.write('User does not exist or not connected now.');
        }
      }
    } catch(err) {
      // show err msg to only a user who typed a wrong command
      client.socket.write(err.message);
    }
    //clientPool.forEach(function(c){
    // c.socket.write(`\t${c.nickname}\n`);});
  });

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\t${client.nickname} has left the channel\n`));
  });

  socket.on('error', function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
