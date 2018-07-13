'use strict';

const net = require('net');
const client = require('./lib/client');
const cmd = require('./lib/cmd');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
const clientPool = [];

server.on('connection', function(socket){
    let client = new Client(socket);
    clientPool.push(client); 
    clientPool.map(c => c.socket.write(`\t${client.nick} has joined the channel\n`));
});

socket.on('data', function(data){
    let message = data.toString();
    clientPool.map(c => c.socket.write(`${client.nick}: ${message}`));
});

socket.on('list', function() {
    client.socket.write(`\n\tConnected Users:\n`);
    client.Pool.map(c => client.socket.write(`\n\t${c.nick}\n`));
});

socket.on('nickname', function(data) {
    client.Pool.map(c => c.socket.write(`\n\t${client.nick} changed their name to ${data.name}\n`));
    client.nick = data.name;
});

socket.on('dm', function(data) {
    let person = clientPool.filter(c => c.nick === data.name);
    person[0].socket.write(`\nWhisper: ${client.nick}: ${data.said}\n`);
    client.socket.write(`\nWhisper: ${data.name}: ${data.said}\n`);
});

socket.on('end', function() {
    socket.end();
});

socket.on('close', function(){
    clientPool = clientPool.filter(c => c.user !== client.user)
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel\n`))
});

socket.on('error', function(data){
    client.socket.write(`\n\t\tERROR\t\n \t\t${data.err}\n`);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});