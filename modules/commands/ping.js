'use strict';

const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, "pong");
module.exports = {
  'execute': execute,
  'numParams': 0
};