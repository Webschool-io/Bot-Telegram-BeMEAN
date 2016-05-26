'use strict';

const _eval = 'Date';
const execute = (bot, msg, match) => bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));

module.exports = {
  execute: execute
}