'use strict'


const uuid = require('uuid');

module.exports = function(socket) {


this.socket = socket;

// make user name that cant change
this.user = `user${Math.random()}`

// nickname that can change
// universially unique identification is what uuid is
this.nick = uuid('uuid/v4')

}