'use strict';

const server = require('../server.js');

module.exports = function(data, clientPool, client, socket) {
  let message = data.toString();
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
  }
};