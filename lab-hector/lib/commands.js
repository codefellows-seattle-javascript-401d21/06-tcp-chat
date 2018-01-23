'use strict';

module.exports = function (data, clientPool, client) {
  let message = data.toString().slice(0, -1);
  let messageArray = message.split(' ');

  switch (messageArray[0]) {
  case '@list': {
    let list = clientPool.map(c => c.nick).join(' ');
    clientPool.filter(c => c.user === client.user).map(c => c.socket.write(`${list}`));
    break;
  }
  case '@quit': {
    client.socket.end();
    break;
  }
  case '@nick': {
    client.nick = messageArray[1];
    client.socket.write(`Your name is now: ${client.nick}\n`);
    break;
  }
  case '@dm': {
    let nick = messageArray[1];
    clientPool.forEach(c => {
      if (c.nick === nick) {
        c.socket.write(`[Direct Message] ${client.nick}: ${messageArray.slice(2).join(' ')}\n`);
      }
    });
    break;
  }
  default: {
    clientPool.filter(c => c.user !== client.user).map(c => c.socket.write(`${client.nick}: ${message}\n`));
    break;
  }
  }
};
