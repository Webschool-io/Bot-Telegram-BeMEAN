'use strict';


const pm = {'parse_mode': 'Markdown'};
const execute = (bot, msg) => {
  const matchDate = /([0-9]{2}\/[0-9]{2}\/[0-9]{4}|[0-9]{2}\/20[0-9]{2})/;
  const _return = 'Calculando: `' + msg.text + ' = ' + eval(msg.text) + '`';
  if (!matchDate.test(msg.text)) bot.sendMessage(msg.chat.id, _return, pm);
};

module.exports = {
  execute: execute
};