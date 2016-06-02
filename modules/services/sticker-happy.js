'use strict';

const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
];

const execute = (bot, msg) => {
  const sticker = stickers[Math.floor(Math.random() * stickers.length)];
  const reply = {'reply_to_message_id': msg.message_id};
  bot.sendSticker(msg.chat.id, sticker, reply);
};

module.exports = {
  execute: execute
};