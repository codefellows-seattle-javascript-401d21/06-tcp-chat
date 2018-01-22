'use strict';

const uuid = require('uuid');

module.exports = function (socket) {
  this.socket = socket;
  this.user = uuid('uuid/v4');
  this.nick = `user_${Math.random()}`;
};