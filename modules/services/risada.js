'use strict';

const execute = (bot, msg, args) => {
  bot.sendMessage(msg.chat.id, 'hehehehehe');
}

module.exports = {
  execute: execute
}