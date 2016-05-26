'use strict';

const stickers = [
  'BQADBAADHAAD06wKAqJqWahqXj1sAg',
  'BQADAQADJwQAAmdLbgH9Ks60pHGEcgI'
];

const execute = (bot, msg) => {
  const sticker = stickers[Math.floor(Math.random() * stickers.length)];
  const reply = { 'reply_to_message_id': msg.message_id };
  bot.sendSticker(msg.chat.id, sticker, reply);
}

module.exports = {
  execute: execute
}