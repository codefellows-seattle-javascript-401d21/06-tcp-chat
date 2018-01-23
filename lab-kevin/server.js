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
    console.log(data);
    console.log('hello');
    console.log('user', client.user);

    let cmdArg = data.toString().substr(0,10).replace(/@([^\s]+)(.*)/g, '$1');
    console.log('Jason', JSON.stringify(cmdArg))
        

        cmdArg = JSON.parse(JSON.stringify(cmdArg))

        (cmdArg)

        cmd[cmdArg];

    if (cmdArg) console.log('cmd', cmdArg);
  
  });


  socket.on('close', function() {
    clientMap.delete(client.user);
    for (var usr of clientMap.values()){ usr.socket.write(`Aravoir, ${client.clientName}, mon ami\n\t`); }
  });

  socket.on('error', function(err) {
    console.error(err);
  });
  
});

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

