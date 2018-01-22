'use strict';

const server = require('../server.js');

module.exports = function(data, clientPool, client, socket) {
  let message = data.toString();
  let messageArray = message.split(' ');
  if (message.charAt(0)!== '/') {
    clientPool.filter(c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${message}\n`)
    );
  }
  if (message.charAt(0) === '/') {
    if(message.charAt(1) === 'l') {
      let list = clientPool.map(c => c.nick).join(' ');
      clientPool.filter(c => c.user === client.user).map(
        c => c.socket.write(`${list}`)
      );
    }
    if(message.charAt(1) === 'q') {
    //   this.close();
      socket.end();
    }
    if(message.charAt(1) === 'n') {
      clientPool.filter(c => c.user === client.user)[0].nick = messageArray[1];
    }
    if(message.charAt(1) === 'd') {
      console.log(messageArray);
      let ignore = messageArray.shift();
      console.log(ignore);
      let target = messageArray.shift();
      console.log(target);
      console.log(messageArray.join(' '));
      clientPool.filter(c => c.nick === target).map(c => c.socket.write(`${messageArray.join(' ')}`));
    }
  }
};