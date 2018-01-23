'use strict';

const server = require('../server.js');

module.exports = function(data, clientPool, client, socket) {
  let message = data.toString().slice(0, -1);
  let messageArray = message.split(' ');
  if (message.charAt(0)!== '/') {
    clientPool.filter(c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${message}\n`)
    );
  }
  if (message.charAt(0) === '/') {
    if(messageArray[0] === '/list') {
      let list = clientPool.map(c => c.nick).join(' ');
      clientPool.filter(c => c.user === client.user).map(
        c => c.socket.write(`${list}`)
      );
    }
    if(messageArray[0] === '/quit') {
      socket.end();
    }
    if(messageArray[0] === '/nickname') {
      clientPool.filter(c => c.user === client.user)[0].nick = messageArray[1];
    }
    if(messageArray[0] === '/dm') {
      let ignore = messageArray.shift();
      let target = messageArray.shift();
      clientPool.filter(c => c.nick === target).map(c => c.socket.write(`${messageArray.join(' ')}`));
    }
  }
};