************************* JEREMY'S CHAT SERVER *******************************
* Author: Jeremy Pearson
* Version: 1.0.0
* Libraries needed: jest, uuid
* Last modification date: 1/22/2018
************************* JEREMY'S CHAT SERVER *******************************

************************** HOW TO START THE SERVER ***************************
1.) Open terminal
2.) Navigate to the lab-jeremy subfolder
3.) Install dependencies (jest/uuid)
4.) launch server.js with node (node server.js)
6.) Open a new terminal tab or window and connect the server
    - For mac: nc <ipaddress or localhost> <port number>
    - For linux or windows: telnet <ipaddress or localhost> <port number>
7.) Go to town! Have fun!


************************** CHAT COMMANDS AND EVENTS **************************

# Default functionality:
    <username> has left the chat - indicates a user left and who to all other connected users.
    <username> has joined the chat - indicates a user has joined the chat to all other connected users.

# Special user commands:
    @quit - disconnects user
    @list - lists all the connected users
    @nickname <name> - allows user to rename theirself (spaces not allowed)
    @dm <username (nickname)> <message> - sends a direct (private) message to desired user


************************** EXPORTED VALUES *************************************

File: client.js
Exported function(s): constructor
Purpose: Takes in a socket object and assigns a new client objects with the the properties of socket, nick (nickname), user (unique user ID). 

File: cmd.js
Exported function(s): parser function
Purpose: Takes in a message and parses out the first part of it to see what @ command the user is trying to use. If a given function is found, it returns the type of command. If a valid command is not found, the command 'help' will be returned and the user should be provided a help menu in the server.js

