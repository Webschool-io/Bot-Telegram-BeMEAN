'use strict';

const _eval = 'test';
const execute = (bot, msg, match) => {
	console.log('Eval recebido: ' + msg.text + ' de: ' + msg.from.id + ' ' + msg.from.first_name + ' ' + msg.from.last_name + ' ' + msg.from.username);
  console.log('msg', msg)
  const _test = msg.text.split('regex ')[1];
  console.log('_test', _test)
  bot.sendMessage(msg.chat.id, _eval + ': ' + eval(_test) );
}

module.exports = {
  execute: execute
}