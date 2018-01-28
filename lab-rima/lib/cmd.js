'use strict';

module.exports = function(data){
  let dString = data.toString();
  // console.log(dString);
  if(dString.slice(0, 1) === '@'){
    // if command is quit
    if(dString.slice(0, 5) === '@quit'){
      return 'Q';
    }

    // if command is list
    else if(dString.slice(0, 5) === '@list'){
      return 'L';
    }

    // if command is nickname change
    else if(dString.slice(0, 9) === '@nickname'){
      if(dString.slice(10).indexOf(' ') >= 0){
        throw new Error('No space allowed in nickname!');
      }
      return {newNN: dString.split(' ')[1].trim()};
    }

    // if command is direct msg
    else if(dString.slice(0, 3) === '@dm'){
      let nn = dString.split(' ')[1];
      let msg = dString.split(' ').slice(2).join(' ');
      return {
        nickname: nn,
        msg: msg,
      };
    }

    else {
    // if dString doesn't start with @, throw error
    // make sure it prints for only a user who typed a wrong command
      throw new Error('Acceptable command: \n' +
                    ' @quit -> disconnect\n' +
                    ' @list  -> show all connected users\n' +
                    ' @nickname <new_name> -> change nickname\n' +
                    ' @dm <to-nickname> <message> -> send direct message to <to_nickname>');
    }
  }

  // if msg to evrybody
  return null;
};
