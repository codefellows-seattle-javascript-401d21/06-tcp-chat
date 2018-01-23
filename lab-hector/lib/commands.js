'use strict';

module.exports = function (cp, data, cb) {
  // client.socket.emit(...)
  try {
    let output = parser(data);

  } catch (e) {
    cb(e);
  }
};

function parser(data) {
  console.log(data);

  let cmd, msg;
  if (data.startsWith('/')) {

    return {
      cmd: data[0],
      msg: str.slice(1),
    };
  }
  throw new Error('Commands must start with /');
}