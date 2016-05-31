'use strict';

const stickers = [
  'BQADAgADVgADGgZFBFCh0QP4JfyUAg',
  'BQADAQAD4AADeHUJBT9wFXPXtg5CAg',
  'BQADAQADDgEAAs0wkgABkjFnUg42-BYC',
  'BQADAgADqwEAAhlgSwTEm4bDHbGq_gI',
  'BQADAQADpQEAArQUiAltLq7j1VlG0wI',
  'BQADBAADCgQAAh8YpgAB-RH3g3ptUVEC',
  'BQADBAADOQAD06wKAnzbafAKQh0LAg'
];

const execute = (bot, msg) => {
  const sticker = stickers[Math.floor(Math.random() * stickers.length)];
  const reply = { 'reply_to_message_id': msg.message_id };
  bot.sendSticker(msg.chat.id, sticker, reply);
};

module.exports = {
  execute: execute
};