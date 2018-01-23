# Feature Tasks
For this assignment you will be building a TCP chatroom. Clients should be able to connect using a telnet client nickname them selfs and talk to each other. Clients should also be able to run special commands to quit, list users, reset their nickname, and send direct messages. You may add as many featrues to the chat as you would like. Do not use any third party librarys in your chatroom modules.

#### Minimum Requirements
Create a TCP Server using the NodeJS net module
Create a Client constructor that models an individual connection.
Each client instance should contain at least an id, nickname, and socket.
Clients should be able to send messages to all other clients by sending it to the server
Clients should be able to run special commands by sending messages that start with a command name
The client should send @quit to disconnect
The client should send @list to list all connectued users
The client should send @nickname <new-name> to change their nickname
The client should send @dm <to-username> <message> to send a message directly to another user by nickname
Connected clients should be maintained in an in memory collection called the clientPool
When a socket emits the close event, the socket should be removed from the client pool
When a socket emits the error event, the error should be logged on the server
When a socket emits the data event, the data should be logged on the server and the commands below should be implemented

## Steps to use this app:

run ```nodemon server.js``` in the directory that has the server file
in another terminal window run:
```nc localhost 3000```
once in, you can use the following commands:
```@list``` to see who else is active
```@nick``` to change your user name
```@dm``` for direct messages
```@quit``` to leave the chatroom