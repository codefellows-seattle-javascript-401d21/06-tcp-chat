'use strict';

//application dependencies
const net = require('net');
const Client = require(`${__dirname}/model/client`);
const cmd = require(`${__dirname}/lib/cmd`);

//server dependencies
const server = module.exports = net.createServer();
const clientMap = new Map();
const pre = '#  ';

server.on('connection', function(socket){
  let client = new Client(socket);
  clientMap.set(client.user, client);

  for (let usr of clientMap.values()){ usr.socket.write(`${pre}host: Bonjour, ${client.clientName}. Comment allez-vous?\n${pre}@${usr.clientName} says: `); }

  socket.on('data', function(data){
    let msg = data.toString().trim();
    let cmdArgs = msg.substr(0,1) === '@' ? msg.substr(1) : null;
    if (! cmdArgs){
      for (let usr of clientMap.values()){
        usr.socket.write(`${pre}@${client.clientName} <all>: ${msg}\n${pre}@${usr.clientName} says: `);
      }
      return;
    }
    let [cmdArg, uname, mesg] = cmdArgs.split(' ');
    let cmdArg_lower = cmdArg.toLowerCase();
    if (! cmd.hasOwnProperty(cmdArg_lower)){
      for (let usr of clientMap.values()){ 
        if (usr.clientName === cmdArg){
          mesg = cmdArgs.split(' ').slice(1).join(' ');
          uname = cmdArg;
          cmdArg_lower = 'dm';
        }
      }
      if(cmdArg_lower !== 'dm') return client.socket.write(`${pre}host: I'm sorry, @${cmdArg} is not a valid command. Try @help\n${pre}@${client.clientName} says: `);
    } 
    cmd[cmdArg_lower](client, clientMap, uname, mesg );
  });

  socket.on('close', function() {
    clientMap.delete(client.user);
    for (let usr of clientMap.values()){ usr.socket.write(`${pre}host: Aravoir, ${client.clientName}, mon ami\n${pre}@${usr.clientName} says: `); }
  });

  socket.on('error', function(err) {
    console.error(err);
  });
  
});

//

