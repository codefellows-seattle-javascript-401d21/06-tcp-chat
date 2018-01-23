## TCP Chat Server

This is an assignment for cf-401 to create a tcp chat server.

#### How to start

In terminal
```
git clone <clone ssh of this repo>
npm intall -g nodemon
npm start
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
