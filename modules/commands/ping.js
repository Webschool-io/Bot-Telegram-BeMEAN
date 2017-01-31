'use strict';

const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, "pong").catch(console.log);
module.exports = {
  'execute': execute,
  'numParams': 0
};