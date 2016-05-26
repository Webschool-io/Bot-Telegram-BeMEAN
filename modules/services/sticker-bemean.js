'use strict';

const sticker = 'BQADAQADGgADt-CfBCZz7J0kak9nAg';

const execute = (bot, msg) => {
  const reply = { 'reply_to_message_id': msg.message_id }
  bot.sendSticker(msg.chat.id, sticker, reply);
}

module.exports = {
  execute: execute
}