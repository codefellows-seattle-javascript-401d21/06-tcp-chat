# 06 TCP Chat

This is a chat application that allows users to send messages to the entire chat room or direct messages to a specific user. This chat room also allows a user to change their name and show a list of all other users.

### Quick Tips
Here are some basic commands to get started:

`/list` - prints a list of active users

`/quit` - allows you to exit chat

`/nickname <new name>` - change your nickname

`/dm <user>` - send a direct message to a user

---

## Data Structures

### Client Module
The client module contains a constructor function that creates an object representing the user. A user object contains their socket, random number nickname, and a unique identifying username.

### Server Module
The server module contains a primary event listening for the user's connection, then 3 additional event listeners within the connection function for the user's message data, if the user leaves the chat, and if there is an error.

### Command (cmd) Module
The command module contains a function with an arity of 4. It parses through a user's message to determine if a specific action should be completed through a switch statement.

Switch cases include:
* `/list ` - this prints a list of all active users
* `/quit` - ends a user's connection and sends a message out to the remaining active users that someone has left
* `/nickname` - allows a user to change their nickname
* `/dm` - sends a direct message to a specific user, not to the entire chat channel

---

## Installing and Getting Started

To install, fork and git clone this repository to your local computer. From the directory `lab-melanie` in your terminal, run the command `npm install`, this will install all necessary node modules to use. You may also need to install `nodemon` if it is not already avaiable globally on your computer.

To use, in the `lab-melanie` directory in your terminal, start `nodemon`. In a second terminal window (no specific directory required) type

```javascript
// mac users with high sierra
nc localhost 3000

// older mac OS or windows
telnet localhost 3000
```
Now you are ready to chat!

