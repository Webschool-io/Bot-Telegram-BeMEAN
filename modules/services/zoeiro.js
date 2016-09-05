'use strict';

const answers = [
  '\'Cause the zoeira, jovem, the zoeira NEVER ends hu3hu3hu3hu3hu3',
  'hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3',
  'DON\'T STOP THE ZOEIRA!',
  'The zoeira: it never ends hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3',
  'Simplesmente não tenho limites hu3hu3hu3hu3hu3hu3hu3hu3hu3hu3',
  'Yes, I\'m very zoeiro, bitch'
];

const stickers = [
  'BQADAQADbAADREz9A1_wd85nVY4cAg',
  'BQADAQADZgADREz9A6v7f7u8LNVRAg',
  'BQADAQADdQADREz9AyANyj7hw1A2Ag',
  'BQADAQADeAADREz9A65VKkYpJMQKAg'
]

const s = require('../settings');

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg);
  });
}

const _execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)], { reply_to_message_id: msg.id });
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, stickers[Math.floor(Math.random() * stickers.length)], { reply_to_message_id: msg.id });
  })
};

module.exports = {
  execute: execute
};