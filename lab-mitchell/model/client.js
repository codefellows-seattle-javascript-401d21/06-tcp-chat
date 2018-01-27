'use strict';

const uuid = require('uuid'); //requires in uuid node module

module.exports = function(socket) { //exports function accepting socket parameter
  this.socket = socket; //assigns client instance's socket to the given socket parameter
  this.nickname = `user_${Math.random()}`; //assigns visible client nickname as random number between 0-1 until updated by user
  this.user = uuid('uuid/v4'); //creates unique user id for TCP chat
  //for example, '416ac246-e7ac-49ff-93b4-f7e94d997e6b' which we can use in testing to validate user
};