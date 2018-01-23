'use strict';


module.exports = (data, connected) => {
  let message = data.toString().slice(0, -1).split(' ');
  if (message[0][0] === '@') {
    if (message[0] === '@quit') {
      return {command: 'close'};
    } else if (message[0] === '@list') {
      return {command: 'list'};
    } else if (message[0] === '@nickname') {
      if (connected.filter(c => c.nick === message[1]).length) return {command: 'error', err: 'Nickname Already In Use'};
      return message[2]? {command: 'error', err: '@nickname requires a name without spaces'} : {command: 'nickname', name: message[1]};
    } else if (message[0] === '@dm') {
      if (connected.filter(c => c.nick === message[1]).length) return {command: 'dm', name: message[1], said: message.slice(2).join(' ')};
      else return {command: 'error', err: 'Requested user does not exist'};
    } else {
      return {command: 'error', err: 'Command does not exist'};
    }
  } else return {command: 'message', said: data};
};


// @quit
// socket.emit('close')



// @list

// @nickname <new-name>

// @dm <to-username> <message>