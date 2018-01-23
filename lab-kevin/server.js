'use strict';

//application dependencies
const net = require('net');
const Client = require(`${__dirname}/model/client`);
const cmd = require(`${__dirname}/lib/cmd`);

//server dependencies
const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
const clientPool = [];
const clientMap = new Map();

server.on('connection', function(socket){
  let client = new Client(socket);
  clientMap.set(client.user, client);

  for (var usr of clientMap.values()){ usr.socket.write(`\tBonjour, ${client.clientName}. Comment allez-vous?\n\t`); }

  socket.on('data', function(data){
    let msg = data.toString().trim();
    console.log(data);
    let cmdArgs = msg.substr(0,1) === '@' ? msg.substr(1) : null;
    if (! cmdArgs) return;
    let [cmdArg, uname, mesg] = cmdArgs.split(' ');
    cmdArg = cmdArg.toLowerCase();
    if (! cmd.hasOwnProperty(cmdArg)) return;
    cmd[cmdArg](client, clientMap, uname, msg );
  });

  socket.on('close', function() {
    clientMap.delete(client.user);
    for (var usr of clientMap.values()){ usr.socket.write(`\tAravoir, ${client.clientName}, mon ami\n\t`); }
  });

  socket.on('error', function(err) {
    console.error(err);
  });
  
});


server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

