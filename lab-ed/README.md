# Lab 06 TCP Chat server

Server connection:
This function has an arity of 2. It expects to be passed the string 'connection' as the first argument and a callback method as the second.
If the first argument is not 'connection' the server will not respond when commands are entered in the terminal.
If the second argument is not a function results will be unpredictable.
Access the method by requiring in 'net' as a const and calling server.on

Socket data:
This function has an arity of 2. It expects to be passed the string 'data' as the first argument and a callback method as the second.
If the first argument is not 'data' any function requiring the data buffer will have unpredictable results.
If the second argument is not a function results will be unpredictable.
Access the method by requiring in 'net' as a const and calling socket.on

Cmd.parse:
This function has an arity of 4. It expects to be passed the buffer data as the first argument, the socket data as the second, the individual client data as the third and all clients in the fourth as clientPool.
Access the method by requiring in './lib/cmd' as a const and calling cmd.parse

Socket close:
This function has an arity of 2. It expects to be passed the string 'close' as the first argument and a callback method as the second.
If the first argument is not 'close' the user will be unable to disconnect from the server using the /quit command.
If the second argument is not a function results will be unpredictable.
Access the method by requiring in 'net' as a const and calling socket.on

Socket error:
This function has an arity of 2. It expects to be passed the string 'error' as the first argument and a callback method as the second.
If the first argument is not 'error' error message will not be logged to the console.
If the second argument is not a function results will be unpredictable.
Access the method by requiring in 'net' as a const and calling socket.on

To start the server run: nodemon server.js
To connect to the server using Netcat: nc localhost 3000
The chatroom commands are:

To quit the server:
/quit

To list all connect users:
/list

To change you nickname:
/nickname newNickname

To private message:
/dm nickname msg