'use strict';

const _eval = 'test';
const execute = (bot, msg, match) => {
  console.log('msg', msg)
  // bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text) );
}

module.exports = {
  execute: execute
}