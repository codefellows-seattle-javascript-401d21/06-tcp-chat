'use strict'

// Application dependencies
const net = require('net')
const Client = require('./model/client')
const cmd = require('./lib/cmd')

// Application setup
const server = module.exports = net.createServer()
const PORT = process.env.PORT || 3000
let clientPool = []

// Server instance setup
server.on('connection', function(socket) {
  let client = new Client(socket)
  clientPool.push(client)
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the game\n`))

  client.socket.write(`Welcome to Jeremy's Chatroom!\r\nType @ for a list of commands (help)\r\n`)

  socket.on('data', function(data) {
    // This is where you will abstract away to your command parser module...
    let message = data.toString()

    // parse the data if starts with @, return data type if it's a valid command
    let cmdType;
    if (message[0] === '@') {
      cmdType = cmd(message.replace(/\r\n$/, "")); //send the message through with no new line character
      console.log('@ COMMAND DETECTED:', cmdType);
    } 
    
    if (!cmdType) {
      // console.log('socket data', data)
      //if no @ 
      clientPool.filter(
        c => c.user !== client.user).map(
          c => c.socket.write(`${client.nick}: ${message}\n`))
    } else if (cmdType === 'quit') { //close the socket for the user and emit a message to all users saying the user left
      client.socket.emit('close');
      client.socket.destroy();
    } else if (cmdType === 'list') { // show a list of users to only the user who typed
      client.socket.write(`\r\nOnline users:\r\n`)
      for (let i = 0; i < clientPool.length; i++){
        client.socket.write(`${clientPool[i].nick}\r\n`)
      }
      client.socket.write(`\r\n`);
    } else if (cmdType === 'dm') { // emit message to single user
      let sentFlag = false;
      for (let i = 0; i < clientPool.length; i++){
        if (message.split(' ')[1].replace(/\r\n$/, "") === clientPool[i].nick) {
          let newMessage = message.split(' ');
          newMessage.splice(0, 2);
          let emitMsg = newMessage.join(' ');

          clientPool[i].socket.write(`\tDM from ${client.nick}: ${emitMsg}\r\n`);
          client.socket.write(`DM sent to ${clientPool[i].nick}\r\n`)
          sentFlag = true;
          break;
        }
      }
      if (!sentFlag) client.socket.write(`User was not found. (Offline or invalid user)\r\n`)//

    } else if (cmdType === 'nickname') { // change user.nick 
      client.nick = message.split(' ')[1].replace(/\r\n$/, "");
      client.socket.write(`Nickname changed to: ${client.nick}\r\n`)
    } else if (cmdType === 'help') { // emit a message to user to typed with list of commands
      client.socket.write(`\r\nA command wasn't found or help message was requested. Try one of the following:\r\n@quit - disconnects user\r\n@list - lists all the connected users\r\n@nickname <name> - allows user to rename theirself (spaces not allowed)\r\n@dm <username (nickname)> <message> - sends a direct (private) message to desired user\r\n\r\n\r\n`);
    }


  })

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user)
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the chat\n`))
  })

  socket.on('error', function(err) {
    console.error(err)
  })
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))