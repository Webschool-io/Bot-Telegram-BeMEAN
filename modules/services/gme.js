'use strict';

const url = require('url');

const execute = (bot, msg, match) => {
  const commmand = 'gme'
  const arr = msg.text.split(commmand + ' ');
  const cmd = arr.splice(1)[0];
  const _url = 'http://pt-br.lmgtfy.com/?q='+encodeURIComponent(cmd);
  bot.sendMessage(msg.chat.id, _url);
}

module.exports = {
    execute: execute
}