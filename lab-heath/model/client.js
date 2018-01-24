'use strict';

const uuid = require('uuid');
const faker = require('faker');

module.exports = function(socket) {
  this.socket = socket,
  this.nick = `- ${faker.name.findName()}`,
  this.user = uuid('uuid/v4');
};
