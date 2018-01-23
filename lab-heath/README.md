
# 06-tcp-chat

### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install`, and you need to do a `npm init`. after that you need to install Faker which is done with `npm install faker`. this npm package will let you have a random name at the start of the app.

To use the code, fo to your terminal and navigate to the `lab-heath` and type
```javascript
node server.js
```

this will start off your server so you then can connect to you via your IP address.  now on a different terminal window, type in the `nc -your ip address- 3000` you IP address change depending on what wifi you are on the one. the school one and your home one are different so make sure it is correct.

once this is done, you will be in a chat room that you can talk to anyone else that you send `nc -your ip address- 3000` too. however, you do need to be on the same wifi for this to work.

### some helpful commands

you have a few commands to use to make this app more playful. you have `/list`, `/cn`, `/dm` and you have `/quit`.

### code for `/list` and how it starts off.
`/list` - will let you see everyone that is connected at that time. this will only be displayed to you.

this kicks off this function. Data is what the person writes in the terminal. and we set that to `text` and the we emit it which then sends that info to the CDM.js page

```javascript
socket.on('data', function(data) {
  let text = cmd.showData(data);
  socket.emit(text.command, text);
});
```

here is what the CDM.js page looks like. data(text from the `emit()`) is passed into it and it will look for the command that you entered and if it does not fine it. it will then just return the dataObj with a property of command of message which will be read back on the server.js page. BUT here we are looking for the `/list` input so we will do what the `/list` does on line 45 and when done at line 46, it will return the object on line 52.
```javascript
cmd.showData = function(data) {

  let dataObj = {};
  let inputData = data.toString().slice(0, -1).split(' ');
  if (inputData[0][0] === '/') {
    if (inputData[0] === '/quit') {
      dataObj.command = 'quit';
    }
    if (inputData[0] === '/dm') {
      dataObj.command = 'dm';
      dataObj.recipient = inputData[1];
      dataObj.message = inputData.slice(2).join(' ');
    }
    if (inputData[0] === '/list') {
      dataObj.command = 'list';
    }
    if (inputData[0] === '/cn') {
      dataObj.command = 'cn';
      dataObj.newNick = inputData[1];
    }
    return dataObj;
  } else {
    dataObj.command = 'message';
    dataObj.message = inputData.join(' ');
    return dataObj;
  }
};
```

once back on the server.js page, we then do this function
```javascript
socket.on('list', function() {
  socket.write(`connected users\n`);
  clientPool.map(clint => socket.write(`\t${clint.nick}\n`));
});
```

this will write the list of people on the server.

`/cn` -  will let you change your name is you wish. type in `/cn` and your name that you want and it will be changed to that.

```
/cn tim
user - Holden Tremblay in now "tim"
```

### code for `/cn`
use the code above line 32-58 for what it does on the CDM.js page
```javascript
socket.on('cn', function(obj) {
  let oldName = client.nick;
  client.nick = obj.newNick;
  let messageToAll = `${oldName} in now "${client.nick}"\n`;
  let text = cmd.showData(messageToAll);
  socket.emit(text.command, text);
  socket.write(`you are now "${client.nick}"\n`);
});
```

`/dm` -  you can Direct message someone if you like, you have to type `/dm` and follow it with the person you wish to talk to.  here is an example

```
/dm tim hey how goes it?
```
and then tim will get this

```
dam: hey how goes it
```

###code for `/dm`
```javascript
socket.on('dm', function(obj) {
  let clientToMessage = obj.recipient;
  let client1 = clientPool.filter(clint => clint.nick === clientToMessage);
  client1[0].socket.write(`${client.nick}: ${obj.message}\n`);
});
```

we also have `/quit` that will log you out of the server.

### code for `/quit`
```javascript
socket.on('quit', function() {
  clientPool = clientPool.filter(c => c.user !== client.user);
  clientPool.map(c => c.socket.write(`\t${client.nick} has left the conversation\n`));
  socket.end();
});
```

help they is helpful
