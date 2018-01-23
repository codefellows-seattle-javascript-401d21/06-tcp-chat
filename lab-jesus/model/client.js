'use strict';

const uuid = require('uuid');

module.exports = function(socket) {
  this.socket = socket;
  this.nick = `user_${Math.floor(Math.random()* 100)}`;
  this.user = uuid('uuid/v4');
};