'use strict';

const url = require('url');

const execute = (bot, msg) => {
  const cmd = msg.text.replace(/gme /ig, '');
  const _url = 'http://pt-br.lmgtfy.com/?q=' + encodeURIComponent(cmd);
  bot.sendMessage(msg.chat.id, _url);
};

module.exports = {
  execute: execute
};