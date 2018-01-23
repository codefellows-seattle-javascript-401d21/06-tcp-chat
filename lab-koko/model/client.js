'use strict';

const uuid = require('uuid');

module.exports = function(socket) {
  this.socket = socket;
  this.nickname = `User_${Math.floor(Math.random() * 20)}`;
  this.user = uuid('uuid/v4');
};