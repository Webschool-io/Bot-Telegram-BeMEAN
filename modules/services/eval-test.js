'use strict';

const _eval = 'test';
const execute = (bot, msg, match) => bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));

module.exports = {
  execute: execute
}