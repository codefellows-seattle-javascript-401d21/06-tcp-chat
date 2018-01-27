'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

//basically add in a bunch of differet commands/events such as 
// server.on('list', function() {}
// server.on('quit', function() {}
// server.on('nickname', function() {}
// server.on('dm', function() {}
// also add things to them like client.socket.write('whatever the message should be');

server.on('connection', function(socket) { //Node net module event, emitted when a new connection is made, socket being instance of net.Socket <whatever that means>
  let client = new Client(socket); //new var client assigned value of instantiated Client object
  clientPool.push(client); //pushes new client to clientPool
  clientPool.map(c => c.socket.write(`\t${client.nickname} has joined the channel\n`)); //maps clientPool to write message to each connected clients socket to inform them that new client joined channel

  socket.on('data', function(data) { //Node net module event, emitted when data is received on socket, data will be buffer or string
    let msg = cmd(data, clientPool); //declare msg to be cmd function from cmd module, passing data and the client pool as arguments
    socket.emit(msg.command, msg); //uses command returned from cmd.js, depending on users entry (e.g. {command: nickname, name: <entered-name>})
  });

  socket.on('close', function() { //Node net module event, emitted once socket is fully closed
    clientPool = clientPool.filter(c => c.user !== client.user); //filters out clients other than user entering @quit command or erroring out
    clientPool.map(c => c.socket.write(`\t${client.nickname} has left the channel\n`)); //map through clientPool and write to all remaining clients that the user has left channel
    socket.end(); //closes socket connection explicitly as mentioned in Node net module docs (see Event: 'end' on net.Socket class for details)
  });

  socket.on('error', function(data) { //Node net module event, emmitted when an error occurs, the close event will be called directly following this event
    client.socket.write(`\tERROR: ${data.err}\n`); //writes to client who incurred error the error passed as property of data object from cmd.js
  });

  socket.on('list', function() { //custom event from cmd.js
    client.socket.write(`\tConnected Users:\n`); //writes header for list of users to client who entered command
    clientPool.map(c => client.socket.write(`\t${c.nickname}\n`)); //maps through clientPool and writes nickname of each client to user who entered command
  });

  socket.on('nickname', function(data) { //custom event from cmd.js
    clientPool.map(c => c.socket.write(`\t${client.nickname} changed their name to ${data.name}\n`)); //maps through clientPool, writes to all clients that the nickname of the client who entered the command has changed to <new-nickname>
    client.nickname = data.name; //client who entered commands nickname reassigned value of name property passed from data object
  });

  socket.on('dm', function(data) { //custom event from cmd.js
    let target = clientPool.filter(c => c.nickname === data.name); //creates target var, assigns value of nickname matching the name property of passed data object
    target[0].socket.write(`\n${client.nickname} whispered: ${data.said}\n`); //writes to the targets socket entered message from client who entered command
  });

  socket.on('message', function(data) { //custom event from cmd.js
    let msg = data.said; //message variable assigned value of said property of data object passed from cmd.js
    clientPool.map(c => c.socket.write(`\t${client.nickname}: ${msg}\n`)); //maps through clientPool and writes message from message sender to each user
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`)); //turn on server to listen for commands, this line logs to nodemon when running