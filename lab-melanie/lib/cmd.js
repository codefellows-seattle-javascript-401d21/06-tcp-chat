'use strict';

module.exports = (message, clientPool, client) => {
  let parseCmd = message.split(' ');
  let command = parseCmd[0];
  let dirMess = parseCmd.slice(2).join(' ');
  let newNick = parseCmd.slice(1).join(' ');
  let list = clientPool.map(c => c.nick).join(' ');
  
  switch(command) {
  // writes list of users
  case '/list':
    clientPool.filter(c => c.user === client.user).map(c => c.socket.write(`${list}\n`));
    break;

  // ends chat
  case '/quit':
    client.socket.end();
    break;

  // allows user to assign nickname
  case '/nickname':
    client.nick = newNick;
    client.socket.write(`\tUpdated name: ${client.nick}\n`);
    break;

  // directs a message to a specific person
  case '/dm':
    clientPool.forEach(c => {
      if(c.nick === parseCmd[1]) {
        c.socket.write(`Direct Message from ${client.nick}: ${dirMess}\n`);
      }
    });
    break;

  // default message amongst chat
  default:
    clientPool.filter(c => c.user !== client.user).map(c => c.socket.write(`${client.nick} says: ${message}\n`));
    break;
  }
};
