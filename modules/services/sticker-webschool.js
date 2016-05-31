'use strict';

const sticker = 'BQADAQADEwADt-CfBI-cLGYwa_u3Ag';

const execute = (bot, msg) => {
  const reply = {'reply_to_message_id': msg.message_id};
  bot.sendSticker(msg.chat.id, sticker, reply);
};

module.exports = {
  execute: execute
};