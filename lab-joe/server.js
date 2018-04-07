'use strict'

// dependencies
const net = require('net')
const Client = require('./model/client');
const cmd = require('./lib/cmd');

// application setup
const server = module.exports = net.createServer()
const PORT = process.env.PORT || 3000;
let clientPool = []

// server instance setup
server.on('connection', function(socket){

  let client = new Client(socket)
  clientPool.push(client)
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the game\n`))

  socket.on('data', function(data){
    let message = data.toString();
    let callbackMessage = function(e){

      let msgarray = e.toString().split(' ');

      if(msgarray[0].substring(0, msgarray[0].length - 1) === '@quit'){
        client.socket.end();
      }else if(msgarray[0].substring(0, msgarray[0].length - 1) === '@list'){

        var currentUsers = clientPool.forEach(c => c.user);
        socket.write(`users\n`);
        for(let i = 0; i < clientPool.length; i++){
          clientPool.forEach(c => c.socket.write(`\t${clientPool[i].user}\n`));
        }

      }else if(msgarray[0] === '@nickname'){

      client.nick = msgarray[1];
      client.socket.write(`\t changed nickname to ${client.nick}`);


      }else if(msgarray[0] === '@dm'){

      for(let i = 0; i < clientPool.length; i++){

        if(clientPool[i].nick.substring(0, clientPool[i].nick.length - 1) === msgarray[1]){
        clientPool[i].socket.write(`${msgarray.join(' ')}`);

        }

          }
         }else{
      clientPool.filter(c => c.user !== client.user).map(c => c.socket.write(`${client.nick}: ${message}\n`))
      }
    }
    cmd(data, callbackMessage(data));
  })

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user)
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel\n`))
  })

  socket.on('error', function(err){
    console.error(err)
  })

})

server.listen(PORT, () => console.log(`listening on ${PORT}`))