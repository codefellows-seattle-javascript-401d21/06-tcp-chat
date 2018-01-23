'use strict';

let cmd = module.exports = {};

cmd.showData = function(data) {

  let dataObj = {};
  let strArray = data.toString().split(' ');
  // console.log('str array', strArray);
  if (strArray[0] === '/quit') { dataObj.command = 'quit';}
  if (strArray[0] === '/dm') {
    dataObj.command = 'dm';
    dataObj.reciepient = strArray[1];
    dataObj.message = strArray[1];
  }
  if (strArray[0] === '/list') { dataObj.command = 'list';}
  if (strArray[0] === '/nick') {
    dataObj.command = 'nick';
    dataObj.newNick = strArray[1];
  }
  return dataObj;
};
