'use strict';

module.exports = function (data, clientPool, client, socket) {
  let message = data.toString().slice(0, -1);
  let messageArray = message.split(' ');
  if (message.charAt(0)!== '/'){
    clientPool.filter(
      c => c.user !== client.user).map(
      c => c.socket.write(`${client.nick}: ${message}\n`));
  }
  if (message.charAt(0) === '/') {
    if (messageArray[0] === '/list') {
      let list = clientPool.map(c => c.nick).join(' ');
      clientPool.filter(c => c.user === client.user).map(c => c.socket.write(`${list}`));
    }
  }
  if (messageArray[0] === '/quit'){
    client.socket.end();
  }
  if (messageArray[0] === '/nickname') {
    client.nick = messageArray[1];
    client.socket.write(`Nickname changed: ${client.nick}\n`);
  }
  if (messageArray[0] === '/dm') {
    let nick = messageArray[1];
    clientPool.forEach(c => {
      if (c.nick === nick) {
        c.socket.write(`${client.nick}: ${messageArray.slice(2).join(' ')}\n`);
      }
    });
  }
};