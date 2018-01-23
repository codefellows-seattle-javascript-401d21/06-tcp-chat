//check for @quit, @list, @nickname, @dm and return help if anything else

module.exports = function(message) {
    let msgArr = message.split(' ');// split into an array and look at the first part type in

    if (msgArr[0] === '@quit') { // return for quit
        return 'quit';
    } else if (msgArr[0] === '@list') { // return for list
        return 'list';
    } else if (msgArr[0] === '@dm') { // return for dm
        return 'dm';
    } else if (msgArr[0] === '@nickname') { // return for nickname change
        return 'nickname';
    } else { // return help menu for anything not recognized
        return 'help';
    }

  }