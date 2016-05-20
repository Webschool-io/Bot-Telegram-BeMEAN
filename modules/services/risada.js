'use strict';

const execute = (bot, msg, args) => {
  const matchDate = /([0-9]{2}\/[0-9]{2}\/[0-9]{4}|[0-9]{2}\/20[0-9]{2})/;
  if(!matchDate.test(msg.text)) bot.sendMessage(msg.chat.id, 'Calculando: ' + msg.text + ' = ' + eval(msg.text));
}

module.exports = {
  execute: execute
}