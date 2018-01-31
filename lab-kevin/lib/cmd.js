'use strict';

const cmd = module.exports = {};

const pre = '#  ';

cmd.quit = (...args) => {
  let [client] = args;
  client.socket.end(`${pre}host: Aravoir...${client.clientName}\n`);
};

cmd.dm  = (...args) => {
  let [client, clientMap, uname, msg ] = args;
  for (let usr of clientMap.values()){ 
    if (usr.clientName === uname){

      usr.socket.write(`\n${pre}@${client.clientName} <direct>: ${msg}\n${pre}@${uname} says: `);
      client.socket.write(`${pre}@${client.clientName}/@${uname} <direct>: ${msg}\n${pre}@${client.clientName} says: `);
      //client.socket.write(`${pre}@${client.clientName} says: `);
      return;
    }
  }
  client.socket.write(`${pre}host: Can not find user, ${uname}.  FYI... user names are case sensitive.\n${pre}@${client.clientName} says: `);
};

cmd.list = (...args) => {
  let [client, clientMap] = args;
  let userList = Array.from(clientMap.values(), user => `@${user.clientName}`).join(', ');
  client.socket.write(`${pre}host: ${userList}\n`); 
  client.socket.write(`${pre}@${client.clientName} says: `);
};

cmd.nickname = (...args) => { 
  let [client, clientMap, new_name] = args;
  if (!new_name) return;
  let oldName = client.clientName;
  client.clientName = new_name;
  client.socket.write(`${pre}host: ${client.clientName}, ca va?\n`);
  client.socket.write(`${pre}@${client.clientName} says: `);

  for (let usr of clientMap.values()){ 
    if (usr.clientName !== new_name){
      usr.socket.write(`\n${pre}host: @${oldName} is now known as ${client.clientName}\n${pre}@${usr.clientName} says: `);
    }
  }

}; 

cmd.help = (...args) => { 
  let [client] = args;
  let helpCommands = `\n\n  @list -- get a list of all current users in the chat
  @dm <username> <message> -- direct message a user
  @username <message> -- short cut to direct message a user
  @nickname <new_name> -- change your user name
  @quit -- exit the chat
  @help -- see the list of commands
  `;
  client.socket.write(`${pre}host: ${helpCommands}\n${pre}@${client.clientName} says: `);

};
