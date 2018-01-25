<strong>Creates a Chatroom that allows people to connect by IP Address and a specified PORT.</strong>

Linux: telnet IP Address PORT
nc IP Address PORT

Listed Commands:
 @list - returns all users currently connected to the server
 @dm [user]- allows a user to directly message a user
 @nickname - allows a user to change their nickname
 @quit - disconnects user from chat

When someone connects, a socket is constructed and a randomly generated username. The user is able to utilize commands to interact with the chatroom and its currently connected users.