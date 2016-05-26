'use strict';

const sticker = 'BQADAQADEwADt-CfBI-cLGYwa_u3Ag';
const reply = { 'reply_to_message_id': msg.message_id };
const execute = (bot, msg) => bot.sendSticker(msg.chat.id, sticker, reply);

module.exports = {
  execute: execute
}