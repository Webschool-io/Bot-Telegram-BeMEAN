'use strict';

const stickers = [
  'BQADBAADuRYAAvEGNAbXUwABQaBhbw4C'
];

const s = require('../settings');

const execute = (bot, msg) => {
  const sticker = stickers[Math.floor(Math.random() * stickers.length)];
  const reply = { 'reply_to_message_id': msg.message_id };
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, sticker, reply);
  });
};

module.exports = {
  execute: execute
};