'use strict';

const sticker = 'BQADAQADEwADt-CfBI-cLGYwa_u3Ag';

const s = require('../settings');

const execute = (bot, msg) => {
  const reply = { 'reply_to_message_id': msg.message_id };
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, sticker, reply).catch(console.log);
  });
};

module.exports = {
  execute
};