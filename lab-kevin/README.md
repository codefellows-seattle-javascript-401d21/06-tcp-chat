># Lab 06: TCP Chat Server

This is basic terminal TCP chat server built on the Nodejs net module.  User can connect the server via local host:3000 using the terminal command nc. The app allows connected users to chat as a group or with a direct message command.  Users have access to   Users are assigned a nickname upon connection and then have access to a command to change their nickname as well as access to commands to list all users, list all commands and quit.

## Install

```BASH
    npm i
```

## Project Dependencies

```JSON
  "devDependencies": {
    "eslint": "^4.16.0"
  },
  "dependencies": {
    "net": "^1.0.2",
    "node-random-name": "^1.0.1"
  }
```

## Usage

### login

- The user will be greeted with a random nickname upon login and be given a text prompt. This message will go out to all users to inform them a new user has joined.

```BASH
    nc localhost 3000
```
```
    nc localhost 3000
    #  host: Bonjour, Kevin. Comment allez-vous?
    #  @Kevin says:
```

### Change nick name

- Users are assigned a nickname upon connection

- Users can change their name with @nickname &lt;new_name&gt;

- Nick names can not contain spaces

```
    nc localhost 3000

    #  host: Bonjour, Trena. Comment allez-vous?
    #  @Trena says: @nickname Kevin
    #  host: Kevin, ca va?
    #  @Kevin says:
```


### Send a message to all users

- Typing in a message and hitting return, sends a message to all users and returns the message you sent as conformation.

- Messages sent to all users are suffixed with &lt;all&gt;

```
    #  @Kevin says: Hello everyone!
    #  @Kevin <all>: Hello everyone!
    #  @Kevin says:
```

### Send a direct message

- Users can direct message each other with the @dm command or the @&lt;usernamse&gt; short cut

- The user gets a conformation of the sent message

- Direct messages are sent with &lt;direct&gt; suffix

#### @dm &lt;usernamse&gt; &lt;message&gt;

```
    #  @Kevin says: @dm Geoff Do you want to get lunch?
    #  @Kevin <direct>: @Geoff: Do you want to get lunch?
    #  @Geoff <direct>: Yeah, that would be far out!
    #  @Kevin says:
    
```

#### @&lt;usernamse&gt; &lt;message&gt;

```
    #  @Kevin says: @dGeoff Do you want to get lunch?
    #  @Kevin <direct>: @Geoff: Do you want to get lunch?
    #  @Geoff <direct>: Yeah, that would be far out!
    #  @Kevin says:
    
```

### List all users

- Users can list all users with the @list command

```
    #  @Kevin says: @list
    #  host: @Kevin, @Geoff, @Vania, @Jerald, @Kat
    #  @Kevin says:
```

### Quit 

- Users can exit the chat with the @quit command

- All users will receive a message that the user left the chat

```
    #  @Kevin says: @quit
    #  host: Aravoir...Kevin  

```

### Help

- Users can type @help to see a list of commands

```
    @Kevin says: @Help
    #  host:

    @list -- get a list of all current users in the chat
    @dm <username> <message> -- direct message a user
    @username <message> -- short cut to direct message a user
    @nickname <new_name> -- change your user name
    @quit -- exit the chat
    @help -- see the list of commands
    
    #  @Kevin says:
```






Minimum Requirements
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