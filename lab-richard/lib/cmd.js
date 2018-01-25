'use strict';

module.exports = (data, connected) => {
  let message = data.toString().slice(0, -1).split(' ');
  if (message[0][0] === '@') {
    switch (message[0]) {
    case '@quit':
      return {command: 'close'};
    case '@list':
      return {command: 'list'};
    case '@nickname':
      if(connected.filter(c => c.nick === message[1]).length) {
        return {command: 'error', err: '@nickname already in use'};
      }    
      return message[2]? {command: 'error', err: '@nickname must not contain spaces'} : {command: 'nickname', name: message[1]};
    case '@dm':
      if(connected.filter(c => c.nick === message[1]).length) {
        return {command: 'dm', name: message[1], whisper: message.slice(2).join(' ')};
      } else {
        return {command: 'error', err: 'user does not exist'};
      }

      default: return {command: 'message', whisper: message.join(' ')};
    }
  } else {
    return {command: 'message', whisper: message.join(' ')};
  }
}