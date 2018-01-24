'use strict';

const cmd = module.exports = {};


cmd.showData = function(data) {

  let dataObj = {};
  let inputData = data.toString().slice(0, -1).split(' ');
  if (inputData[0][0] === '/') {
    if (inputData[0] === '/quit') {
      dataObj.command = 'quit';
    }
    if (inputData[0] === '/dm') {
      dataObj.command = 'dm';
      dataObj.recipient = inputData[1];
      dataObj.message = inputData.slice(2).join(' ');
    }
    if (inputData[0] === '/list') {
      dataObj.command = 'list';
    }
    if (inputData[0] === '/cn') {
      dataObj.command = 'cn';
      dataObj.newNick = inputData[1];
    }
    return dataObj;
  } else {
    dataObj.command = 'message';
    dataObj.message = inputData.join(' ');
    return dataObj;
  }
};
