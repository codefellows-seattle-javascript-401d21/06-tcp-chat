'use strict';

const server = require('../server.js');

module.exports = function(data, clientPool, client) {
  console.log('server',server);
  console.log('data',data);
  let message = data.toString();
  if (message.charAt(0)!== '/') {
    clientPool.filter(c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${message}\n`)
    );
  }
  if (message.charAt(0) === '@') {
    // if(message === '/list') {
    let list = clientPool.map(c => c.nick).join(' ');
    console.log('list',list);
    console.log('clientPool',clientPool);
    clientPool.filter(c => c.user === client.user).map(
      c => c.socket.write(`${list}`)
    );
    // }
  }
};