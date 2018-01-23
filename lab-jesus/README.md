#Documentation

==User_Guide==
1. log into chat using a telnet connection(windows/linux)
    'telnet <ip address> <port>'
2. after welcome message type messages and hit enter to send
3. Commands:
    -@nickname <new_nickname>: change nickname, all one word no spaces
    -@dm <to_nickname> <message>: sends a private message to only one user
    -@list: lists all active users
    -@quit: end chat session

+++Modules+++
server.js
    -Takes incoming connections and connects them to websocket
    -creates a new instance of client
    -logs in client to chat
    -notifies when new user logs in
    -notifies when user logs out

client.js
    -creates a client object with the following properties:
        -socket
        -nickname
        -user_ID
