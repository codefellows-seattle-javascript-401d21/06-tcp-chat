'use strict';

const cmd = module.exports = {};

cmd.quit = (...args) => {
  let [client] = args;
  client.socket.end(`\tAravoir...${client.clientName}\n`);
};

cmd.dm  = (...args) => {
  let [client, clientMap, uname, msg ] = args;
  for (var usr of clientMap.values()){ if (urs.uname) return usr.socket.write(`\t${msg}`);}
};

cmd.list = (...args) => {
  let [client, clientMap] = args;
  for (var usr of clientMap.values()){ usr.socket.write(`\t${client.clientName}\n\t`); }
};

cmd.nickname = (...args) => { 
  let [client, clientMap, new_name, mesg ] = args;
  if (!new_name) return;
  client.clientName = new_name;
  client.socket.write(`\tCa va? ${client.clientName}\n\t`)
}; 
