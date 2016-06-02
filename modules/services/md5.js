'use strict';

const url = require('url');
const md5 = require('md5');

const execute = (bot, msg, match) => {
  const query = match.input.replace('MD5', 'md5').split('md5 ')[1];
  bot.sendMessage(msg.chat.id, "MD5: " + md5(query));
  console.log('query', query)
};
module.exports = {
  execute: execute
};