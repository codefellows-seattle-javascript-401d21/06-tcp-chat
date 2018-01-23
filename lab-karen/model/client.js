'use strict';

const uuid = require('uuid'); //package for unique user id

//this module is a constructor for clients using the chatroom
module.exports = function(socket) {
  this.socket = socket;
  this.nick = `user_${Math.random()}`;
  this.user = uuid('uuid/v4');
};
