'use strict';

module.exports = (data, connected) => {
  let message = data.toString().trim().split(' '); //assigns value of message to data turned into a string, trimmed of whitespace on each end, and then split by spaces
  //this takes a message typed by a client connected on NC and allows us to check for specific commands entered by the client
  if(message[0][0] === '@') { //conditional verifying that the first letter of the first element @ of an @quit/.etc command is chosen character for issuing commands
    switch(message[0]) { //switch case, where as long as there is a message, i.e. something in the first index of processed data, like @this @that etc.
    case '@quit': //in the case that the first word of message is @quit
      return {command: 'close'}; //return command to close connection of client entering command
    case '@list': //in the case that the first word of message is @list
      return {command: 'list'}; //return ommand to list all connected clients
    case '@nickname': //in the case that the first word of message is @nickname
      if(connected.filter(c => c.nickname === message[1])) return {command: 'error', err: 'Nickname already in use'}; //if filtering connected, which contains clientPool in server.js, by the entered client nickname to be assigned returns a value i.e. already exists, return an error command informing client the username is already assigned
      return message[2] ? {command: 'error', err: '@nickname requires a name without spaces'} : {command: 'nickname', name: message[1]}; //return result of ternary, where if there is a second word in message, error out to user and inform them that chosen nickname can only be one word
      //if there is no 3rd item (e.g. @nickname lala <third-item>) return command nickname and sets that users name to the world following the command
    case '@dm': //in the case that the first word of message is @nickname
      if(connected.filter(c => c.nickname === message[1]).length) return {command: 'dm', name: message[1], said: message.slice(2).join(' ')}; //if client pool filtered by nickname entered following @dm command exists, return command dm with name of recipient user, and only contents of 3rd index on will be joined and send as 'said'
      return {command: 'error', err: 'User does not exist, cannot direct message'};
    default:
      return {command: 'error', err: 'Command does not exist'};
    }
  } else return {command: 'message', said: message.join(' ')}; //if not special command character, rejoin message and return as normal chat message
};
     
// if (message[0] === '@quit') { //refactored to switch statement
//   return {command: 'close'};
// } else if (message[0] === '@list') {
//   return {command: 'list'};
// } else if (message[0] === '@nickname') {
//   if (connected.filter(c => c.nickname === message[1])) return {command: 'error', err: 'Nickname already in use'};
//   return message[2] ? {command: 'error', err: '@nickname requires a name without spaces'} : {command: 'nickname', name: message[1]};
// } else if (message[0] === '@dm') {
//   if (connected.filter(c => c.nickname === message[1]).length) {return {command: 'dm', name: message[1], said: message.slice(2).join(' ')};
//   } else return {command: 'error', err: 'Requested user does not exist'};
// } else {
//   return {command: 'error', err: 'Command does not exist'};
// }
// } else return {command: 'message', said: data}; //if not using the command character @
// };