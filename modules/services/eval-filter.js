'use strict';

const _eval = 'filter';
const execute = (bot, msg, match) => bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));

module.exports = {
  execute: execute
}