># Lab 06: TCP Chat Server

This is basic terminal TCP chat server built on the Nodejs net module.  User can connect the server via local host:3000 using the terminal command nc. The app allows connected users to chat as a group or with a direct message command.  Users have access to   Users are assigned a nickname upon connection and then have access to a command to change their nickname as well as access to commands to list all users, list all commands and quit.

>## Install

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

>## Usage

### Start Server

```BASH
    npm start
```

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

```
    nc localhost 3000
    #  @Geoff says:
    #  host: Bonjour, Kevin!
    #  @Geoff says:

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
```
    #  @Geoff says:
    #  host: @Lyndsay is now known as Kevin
    #  @Geoff says:
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
    #  @Kevin/@Geoff<direct>: Do you want to get lunch?
    #  @Geoff <direct>: Yeah, that would be far out!
    #  @Kevin says:
```

```
    #  @Geoff says:
    #  @Kevin <direct>:  Do you want to get lunch?
    #  @Geoff says:  @dm Kevin Yeah, that would be far out!
    #  @Geoff/@kevin <direct>: Yeah, that would be far out!
    #  @Geoff says:
```

#### @&lt;usernamse&gt; &lt;message&gt;

```
    #  @Kevin says: @dGeoff Do you want to get lunch?
    #  @Kevin <direct>: @Geoff: Do you want to get lunch?
    #  @Geoff <direct>: Yeah, that would be far out!
    #  @Kevin says:
    
```

```
    #  @Geoff says:
    #  @Kevin <direct>:  Do you want to get lunch?
    #  @Geoff says:  @Kevin Yeah, that would be far out!
    #  @Geoff/@kevin <direct>:  @Kevin Yeah, that would be far out!
    #  @Geoff says:
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

```
    #  @Geoff says:
    #  host: Aravoir...Kevin 
    #  @Geoff says: 

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

### Command not found

```
    host: I'm sorry, @w is not a valid command. Try @help 
```

### User not found
```
    #  @Kevin says: @list
    #  host: @Kevin, @Val
    #  @Kevin says: @Mie
    #  host: I'm sorry, @Mie is not a valid command or user. Try @help
    #  @Kevin says: @dm Mike Hello
    #  host: Can not find user, Mike.  FYI... user names are case sensitive.
    #  @Kevin says:
```

>## Code

### index.js

- Requires server.js

- Invokes server.listen which has an arity of 2, a port number and callback

### server.js

#### server.on('connection', callback(socket))

  - Airty: 2

  - Parameters 'server event name', function(socket)

  - The callback is invoked when a connection is made to the server.  The socket objet for the cponnection event is sent ss the argument of the callback

  

  #### socket.on('data', callback)

  - Airty: 2

  - Parameters  'socket event name', function(socket)

  - The callback is invoked when a socket receives data. The callback is invoked withe the data as an argument

  - The callback parses out the data into script defined commands and messages, passing the messages to the cmd module when necessary.

  #### socket.on('close', callback)

  - Airty: 2

  - Parameters: socket event name', function();
 
  - When socket.end() is invoked it triggers the socket close event.  The callback sends out a message indicating which user has left the chat. 

  #### socket.on('error', callback)

  - Airty: 2

  - Parameters: socket event name', function(error);

  - The callback logs the error.

### model/client.js

#### require('uuid')

 - This module is used to generate a unique identifier to use as an id for a user

 #### require('node-random-name')

 - This module is used to generate a random nickname for a user

 #### module.exports 

  - Airty: 1

  - parameters: socket

  module.expots for client.js is an object constructor used to hold user information with properties of socket, clientName, and user

  ### lib/cmd.js

  - This module contains the app defined user commands. 

  #### quit

  - Airty: array

  - Parameters: expecting the first item to be a client object

  - The quit method uses the socket property to end the session for that user and send a goodbye message. 


#### dm

  - Airty: array

  - Parameters: Expecting client object, map of connected users, username to message, and the message to send

  - The dm method searches the map for a user name and if found, sends a message to just that user, indicating who it was from.  It also sends a duplicate message back to the sender as conformation that the message was sent and to whom.

  
  #### list

  - Airty: array

  - Parameters: Expecting a client object and user map

  - The list method creates a csv of current users and sends it to the requester

  
  #### nickname

  - Airty: array

  - Parameters: Expecting a client object, user map, and new name

  - The nickname method allows a user to change their screen name.  It sends a response back to teh user and a message to all users indicating the name change.

   #### help

  - Airty: array

  - Parameters: expecting client object

  - The help method sends a list of commands to the requester.
  