'use strict';

const url = require('url');
const md5 = require('md5');

const execute = (bot, msg, match) => {
  console.log('match',match)
  bot.sendMessage(msg.chat.id, "MD5: " + md5(msg));
}
module.exports = {
    execute: execute
}