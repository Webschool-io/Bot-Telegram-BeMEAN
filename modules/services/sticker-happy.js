'use strict';

const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
];
let memoization= []

const memoize = (rand) => {
  if(rand !== memoization[memoization.length-1])
    memoization.push(rand);
  else{
    rand = _rand(stickers);
    memoization.push(rand);
  }
}
const _rand = (stickers) => Math.floor(Math.random() * stickers.length);
const execute = (bot, msg) => {
  memoize(_rand(stickers));
  const sticker = stickers[memoization.length-1];
  const reply = { 'reply_to_message_id': msg.message_id };
  bot.sendSticker(msg.chat.id, sticker, reply);
}

module.exports = {
  execute: execute
}