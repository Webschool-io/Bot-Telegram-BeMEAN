'use strict';

const sticker = 'BQADAQADGgADt-CfBCZz7J0kak9nAg';
const s = require('../settings');

const execute = (bot, msg) => {
  const reply = { 'reply_to_message_id': msg.message_id };
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, sticker, reply);
  })
};

module.exports = {
  execute: execute
};