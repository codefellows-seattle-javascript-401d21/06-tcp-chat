'use strict';

const uuid = require('uuid');

module.exports = function(socket) {
  this.socket = socket;
  this.nick = generateName('user_');
  this.user = uuid('uuid/v4');
};

let nameClosure = () => {
  let num = 0;
  function genNickName(prefix) {
    return prefix.concat(num++);
  }
  return genNickName;
};

let generateName = nameClosure();
