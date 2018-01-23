'use strict';

const uuid = require('uuid');
const randomName = require('node-random-name');

module.exports = function(socket) {
  this.socket = socket;
  this.clientName = randomName({ random: Math.random, first: true });
  this.user = uuid('uuid/v4');
};