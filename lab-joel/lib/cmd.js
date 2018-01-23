'use strict';

exports.commands = (message, socket, client, clientPool) => {
  if (message.slice(0, 1) === '/') {
    let cmdArr = message.trim().split(' ');
    let cmd = cmdArr[0];
    let name = cmdArr[1];

    switch(cmd) {
    case '/quit':
      socket.end();
      break;

    case '/list':
      socket.write(`Users Online: ${clientPool.map(el => el.nickname).join(', ')}\n`);
      break;

    case '/nm':
      var oldName = client.nickname;
      client.nickname = name;
      clientPool.map(c => c.socket.write(`${oldName} changed name to ${name}\n`));
      break;


    case '/dm':
      message = message.split(' ').slice(2).join(' ');
      clientPool.filter(n => n.nickname === name)[0].socket.write(`${client.nickname}: ${message}`);
      break;

    default:
      socket.write('Invalid command \n Valid commands = /quit /list /nm /dm');
    }
  }
};
