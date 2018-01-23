# Lab 06 - TCP Chat Server

**Author**: Liza Oh

## Overview
This is a TCP chatroom. Clients can connect using a telnet client nickname and message to each other. Clients can also run special commands to quit, list users, reset their nickname, and send direct messages.

## Getting Started
The user must:
-Npm init their project
-Npm i uuid
-Npm i nodemon
-Open two new tabs: nc localhost 3000
-/list (to list users)
-/quit (to quit the program)
-/nickname (add new nickname)
-/dm (add nickname of user you want to message)

## Modules
**cmd.js**:
-Parameters: 3 (data, clientPool, client)
-Expected Data: All of the chat commands.
-Behavior:
*/list: This if statement will allow the user to input '/list' and shows the connected users.
*/quit: This if statement will allow the user to input '/quit' and disconnect from the chatroom.
*/nickname: This if statement will allow the user to input '/nickname' to change their username.
*/dm:  This if statement will allow the user to input '/dm bob' send as direct message to a user with the nickname bob.

**client.js**:
-Parameters: 1 (socket)
-Expected Data: object constructor
-Behavior: Assign socket and nick to user(random number)

**server.js**:
-Parameters: 2 (socket, data)
-Expected Data: This sets up the server.
-Behavior: Keeps track of the client data.

## Architecture
Javascript
Node
Jest