'use strict';

const _eval = 'filter';
const execute = (bot, msg, match) => {
	bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));
	console.log('Eval recebido: ' + msg.text + ' de: ' + msg.from.id + ' ' + msg.from.first_name + ' ' + msg.from.last_name + ' ' + msg.from.username);
}

module.exports = {
  execute: execute
}