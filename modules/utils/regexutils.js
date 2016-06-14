'use strict';

const regex = {
  blacklist: [
    /.*process.*/ig,
    /.*exec.*/ig,
    /.*env.*/ig,
    /.*exit.*/ig,
    /.*require.*/ig,
    /.*bot*./ig
  ]
};

const isInputOK = (input) => {
  const blacklist = regex.blacklist;
  let _return = true;
  blacklist.forEach((r) => {
    if (input.match(r)) {
      _return = false;
    }
  });
  return _return;
};

module.exports = {
  regex,
  isInputOK
};