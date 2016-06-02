'use strict';

/**
 *
 * @param msg
 * @param msg.chat
 * @param msg.chat.id
 * @param match
 * @param bot
 */
const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, match[2], {'parse_mode': 'Markdown'});
module.exports = {
  'execute': execute,
  'numParams': 1
};