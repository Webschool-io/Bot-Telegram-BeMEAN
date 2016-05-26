'use strict';

const _eval = 'test';
const execute = (bot, msg, match) => {
  console.log('msg', msg)
  const _test = msg.text.split('regex ')[1];
  console.log('_test', _test)
  bot.sendMessage(msg.chat.id, _eval + ': ' + eval(_test) );
}

module.exports = {
  execute: execute
}