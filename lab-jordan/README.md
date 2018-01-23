### INSTALLATION AND USE:

Run npm init to install the necessary dependencies before running the program. These should include uuid.

This program can be used to run a chat room, where each user has different methods they can access in chat.

To start, the user must start a node server by using a command such as `$ nodemon`. Then, users use the netcat command `$ nc` followed by the port number (3000 by default) in order to connect to the chat. After that, users can type freely and their messages will appear to everyone on the server.

### MODULES:

* server.js exports the server and keeps track of client data for each user.

* client.js is a constructor for the Client object. It takes in a socket and returns a new randomly named client. The airty is one, and the expected data type of socket object.

* cmd.js holds the commands that are accessed in chat. Whenever a message is sent, it takes in the client pool, the message sent, and the client the message belonged to. It then performs its function in the chat window. The airy is 3, and the expected data types are a message (string), the client pool (array), and the Client object.

### ACCESSING METHODS:

#### Listing every user in the chat
`/list` outputs every user currently in the channel.

#### Changing your displayed name
`/nickname <new nickname>` changes your displayed name, and shows you a message confirming the change.

#### Sending a direct message to another user
`/dm <recipient> <message>` sends a message only to the designated recipient, who is notified that it is a direct message specifically from the user.

#### Quitting the chat
`/quit` quits the channel and announces that the user is leaving.
