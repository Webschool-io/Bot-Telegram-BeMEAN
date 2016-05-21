'use strict';

const url = require('url');
const md5 = require('md5');

const execute = (bot, msg, match) => {
  const command = match.input;
  const query = command.split()[1].toLowerCase();
  bot.sendMessage(msg.chat.id, "MD5: " + md5(query));
  console.log('query', query)
}
module.exports = {
    execute: execute
}