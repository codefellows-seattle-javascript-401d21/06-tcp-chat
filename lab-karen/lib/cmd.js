'use strict';

const server = require('../server.js');

module.exports = function(data, clientPool) {
  console.log('data', data);
  //convert data to array
  let message = data.toString().split(' ');
  //code to find first character
  let cmdMessage = message[0];
  let commandCode = message[0][0];
  console.log('cmdMessage', cmdMessage);
  console.log('command', commandCode);
  // let dirMess = message.slice(2).join(' ');
  // let newNick = message.slice(1).join(' ');
  // let list = clientPool.map(c => c.nick).join(' ');

  if (commandCode === '/') {
    switch(cmdMessage) {
    case '/quit':
      return {command: 'close'};
    case '/list':
      return {command: 'list'};

    }
  } else return {command: 'message', said: message.join(' ')};
};
