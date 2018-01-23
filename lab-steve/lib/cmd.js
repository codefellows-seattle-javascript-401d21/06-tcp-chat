'use strict';

module.exports = (data) => {
  let info = {};
  let items = data.toString().trim().split(' ');

  switch (items[0]) {
  case '/quit':
    info.action = 'quit';
    break;
  case '/list':
    info.action = 'list';
    break;
  case '/nick':
    if (items.length !== 2) {
      info.action = 'error';
      info.msg = 'Error: Invalid nick or no nick provided';
      break;
    }
    info.action = 'nick';
    info.nickname = items[1];
    break;
  case '/dm':
    if (items.length < 3) {
      info.action = 'error';
      info.msg = 'Error: Invalid direct message format';
      break;
    }
    info.action = 'dm';
    info.who = items[1];
    info.msg = items.slice(2).join(' ');
    break;
  case '/help':
    info.action = 'help';
    info.msg =
      `\t/quit                  quits session
      \t/list                  displays connected users
      \t/nick <nickname>       set different nickname
      \t/dm <user> <message>   send direct message to user\n`;
    break;
  default:
    info.action = 'broadcast';
    info.msg = items.join(' ');
    break;
  }

  return info;
};

