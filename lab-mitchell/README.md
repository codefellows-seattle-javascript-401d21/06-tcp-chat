# Lab 6 - TCP Chat Server

**Author**: Mitchell
**Version**: 1.0.0

## Overview
In this lab we were tasked to created a TCP chatroom. Clients should be able to connect using a netcat or telnet client, give themselves nicknames to be referred to as and directly messaged as by other users, and be able to talk to each other. There should be special commands available to users such as quit, list all users, set/reset their nickname, and send direct messages to other users by their ID/nickname.

## Getting Started
To get this application up and running, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. After those packages have installed, you can run `npm test` to explore the included tests and functionality of their respective solutions. You can open up the code in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired.

If exploring the functionality of the chat server, you can enter the terminal command `npm start` to initiate a server listening on port 3000. If that port is occupied, you can add your own desired port to a `.env` file in the lab-mitchell/ directory such as `PORT = <desired port number>` in said file. You can then open new terminal tabs or terminal instances and enter `nc localhost 3000` or `nc localhost <desired port number>` to connect to the server. Each new tab and `nc localhost <desired port number>` will create a new user with a unique ID to the chat pool, and each time a new user enters the chat all users currently logged in will be broadcast a message informing them of that new user connection. With multiple terminal tabs/instances open, you can enter messages in the respective tabs which will be sent to and visible in all other instances.
**NOTE** _[NC - NetCat for use with current Macs, check for alternatives if needed]_

## Description