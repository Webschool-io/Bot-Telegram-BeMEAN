'use strict';

const _eval = 'map';
const execute = (bot, msg, match) => {
	console.log('Eval recebido: ' + msg.text + ' de: ' + msg.from.id + ' ' + msg.from.first_name + ' ' + msg.from.last_name + ' ' + msg.from.username);
  if( !(/require/.test(msg.text)) )
    bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));
};

module.exports = {
  execute: execute
}