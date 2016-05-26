'use strict';

const execute = (bot, msg) => bot.sendMessage(msg.chat.id, 'reduce: ' + eval(msg.text));

module.exports = {
  execute: execute
}