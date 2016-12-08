"use strict";

const regexutils = require('./utils/regexutils');
const userutils = require('./utils/userutils');
const monitutils = require('./utils/monitutils');

/**
 *
 * @param msg
 * @param isEval
 */
const isSecure = (msg, isEval, cbk) => {
  let secure = true;
  if (!monitutils.isAdmin(msg.chat.id)) {
    userutils.isUserBlacklisted(msg.from.id, (err, data) => {
      if (err) secure = false;
      else {
        secure = !data;
        if (!regexutils.isInputOK(msg.text) && isEval) secure = false;
      }
      cbk(secure);
      else cbk(true);
    });
  } else cbk(true)
};

module.exports = {
  isSecure
};
