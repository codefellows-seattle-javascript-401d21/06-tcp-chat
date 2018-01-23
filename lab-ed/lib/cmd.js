'use strict'

const cmd = module.exports = {}

cmd.parse = function(data, socket, client, clientPool) {
  let command = (data.toString().slice(0, -1)).split(' ')

  switch (command[0]) {
  case '/quit':
    client.socket.end()
    break;
  case '/list':
    clientPool.map(c => {
      c.socket.write(`\t${client.nick} is logged on\n`)})
    break;
  case '/nickname':
    client.nick = command[1]
    socket.write(`\tYour nickname is now: ${client.nick}\n`)
    break;
  case '/dm':
    clientPool = clientPool.filter(c => c.nick === command[1])
    clientPool.map(c => c.socket.write(`\t${client.nick} wrote: ${command.splice(2).join(' ')}\n`))
    break;
  default:
    clientPool = clientPool.filter(c => c.user === client.user)
    clientPool.map(c => c.socket.write(`Invalid command\nCommands are:\n/quit\n/list\n/nickname name\n/dm msg\n`))
  }
}