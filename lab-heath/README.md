
# 06-tcp-chat

### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install`, and you need to do a `npm init`. after that you need to install Faker which is done with `npm install faker`. this npm package will let you have a random name at the start of the app.

To use the code, fo to your terminal and navigate to the `lab-heath` and type
```javascript
node server.js
```

this will start off your server so you then can connect to you via your IP address.  now on a different terminal window, type in the `nc -your ip address- 3000`


once this is done, you will be in a chat room that you can talk to anyone else that you send `nc -your ip address- 3000` too. however, you do need to be on the same wifi for this to work.

### some helpful commands

you have a few commands to use to make this app more playful. you have `/list`, `/cn`, `/dm` and you have `/quit`.

`/list` - will let you see everyone that is connected at that time. this will only be displayed to you.

`/cn` -  will let you change your name is you wish. type in `/cn` and your name that you want and it will be changed to that.

```
/cn tim
user - Holden Tremblay in now "tim"
```

`/dm` -  you can Direct message someone if you like, you have to type `/dm` and follow it with the person you wish to talk to.  here is an example

```
/dm tim hey how goes it?
```

and then tim will get this

```
dam: hey how goes it
```

we also have `/quit` that will log you out of the server.


help they is helpful
