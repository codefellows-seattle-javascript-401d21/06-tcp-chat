'use strict';

const cmd = module.exports = {};

cmd.quit = () => {
  console.log('Hey');
  client.destroy('\tAravoir\n');
};

cmd.dm  = (uname, msg) => {
  for (var usr of clientMap.values()){ if (urs.uname) return usr.socket.write(msg);}
};


cmd.list = () => {
  for (var usr of clientMap.values()){ usr.socket.write(`\t${client.clientName}, mon ami\n\t`); }
};

cmd.nickname = (new_name) => { 
  client.clientName = new_name;
}; 


