'use strict';

let cmd = module.exports = {};

cmd.showData = function(data) {


  let dataObj = {};
  let strArray = data.toString().slice(0, -1).split(' ');
  // console.log('str array', strArray);
  if (strArray[0] === '/quit') { dataObj.command = 'close';}
  if (strArray[0] === '/dm') {
    let message = '';
    for (let i = 2; i < strArray.length; i ++) {
      message = message + ` ${strArray[i]}`;
    }
    dataObj.command = 'dm';
    dataObj.recipient = strArray[1];
    dataObj.message = `${message}\n`;
  }
  if (strArray[0] === '/list') { dataObj.command = 'list';}
  if (strArray[0] === '/nick') {
    dataObj.command = 'nick';
    dataObj.newNick = strArray[1];
  }
  return dataObj;
};
