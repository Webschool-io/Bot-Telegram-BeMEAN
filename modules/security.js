"use strict";

const regexutils = require('./utils/regexutils');
const userutils = require('./utils/userutils');

/**
 *
 * @param msg 
 * @param isEval
 */
const isSecure = (msg, isEval, cbk) => {
  let secure = true;
  userutils.isUserBlacklisted(msg.from.id, (err, data) => {
    if (err) secure = false;
    else {
      secure = !data;
      if (!regexutils.isInputOK(msg.text) && isEval) secure = false;
    }
    cbk(secure);
  });
};

module.exports = {
  isSecure
};