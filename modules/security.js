"use strict";

const regexutils = require('./utils/regexutils');

/**
 *
 * @param msg
 * @param isEval
 */
const isSecure = (msg, isEval) => {
  let secure = true;
  if (!regexutils.isInputOK(msg.text) && isEval) secure = false;
  return secure;
};

module.exports = {
  isSecure
};