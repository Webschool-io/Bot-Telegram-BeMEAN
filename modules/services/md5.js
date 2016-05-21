'use strict';

const url = require('url');
const md5 = require('md5');

const execute = (bot, msg, match) => {
  console.log('match.input 1',match.input.split('md5 ')[1])
  const query = match.input.split('md5 ')[1]
  bot.sendMessage(msg.chat.id, "MD5: " + md5(query));
}
module.exports = {
    execute: execute
}