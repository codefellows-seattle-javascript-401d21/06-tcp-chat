'use strict';

let cmd = module.exports = {};

cmd.showData = function(data) {


  let dataObj = {};
  let strArray = data.toString().slice(0, -1).split(' ');
  // console.log('str array', strArray);
  if (strArray[0] === '/quit') { dataObj.command = 'close';}
  if (strArray[0] === '/dm') {
    dataObj.command = 'dm';
    dataObj.recipient = strArray[1];
    dataObj.message = strArray[2];
  }
  if (strArray[0] === '/list') { dataObj.command = 'list';}
  if (strArray[0] === '/nick') {
    dataObj.command = 'nick';
    dataObj.newNick = strArray[1];
  }
  return dataObj;
};
