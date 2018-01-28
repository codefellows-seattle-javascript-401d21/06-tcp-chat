## TCP Chat Server

This is an assignment for cf-401 to create a tcp chat server.

#### How to start

In terminal,
clone this repo
```
git clone <clone ssh of this repo>
```
start the server
```
node server.js
```
if you are the one who open the server, to start chat
```
telnet localhost 8888
```
if you are joining the chat room someone opens, to start chat
```
telnet <server_address> 8888
```


#### What you can do

* Message to all connected users
```
<type message>
```

* Message to a specific user
```
@dm <to_nickname> <message>
```

* List all connected users
```
@list
```

* Change your nickname
```
@nickname <new_nickname>
```

* Quit
```
@quit
```

## Specification

* nickname cannot have any whitespace
