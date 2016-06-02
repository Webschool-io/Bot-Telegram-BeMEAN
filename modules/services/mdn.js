'use strict';

const url = require('url');
const https = require('https');

const execute = (bot, msg) => {
  const commmand = 'js';
  const arr = msg.text.split(commmand + ' ');
  const cmd = arr.splice(1)[0];
  const _url = 'http://mdn.io/' + cmd;
  bot.sendMessage(msg.chat.id, _url);
};
module.exports = {
  execute: execute
};