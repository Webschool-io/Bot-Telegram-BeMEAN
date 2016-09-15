'use strict';

const pm = {'parse_mode': 'Markdown'};
const isOk = require('../utils/regexutils').isInputOK;
const safeEval = require('sewe');

const execute = (bot, msg) => {
  //const matchDate = /([0-9]{2}\/[0-9]{2}\/[0-9]{4}|[0-9]{2}\/20[0-9]{2})/;
  if (isOk(msg.text)) {
    const _return = 'Calculando: `' + msg.text + ' = ' + safeEval(msg.text) + '`';
    //if (!matchDate.test(msg.text)) bot.sendMessage(msg.chat.id, _return, pm);
    bot.sendMessage(msg.chat.id, _return, pm);
  } else {
    require('../utils/monitutils').notifyAdmins(bot, 'Eval malicioso detectado: `' + msg.text + '`. Enviado por: ' + msg.from.id + ', ' + msg.from.first_name + ' ' + msg.from.last_name + ', @' + msg.from.username);
    bot.sendMessage(msg.chat.id, 'Aaaaaaah! Espertinho você, em! Esse comando não é permitido não, jovem. O @osuissa e o @rmunhoz foram avisados sobre isso e, se pá, nunca mais respondo uma mensagem sua.');
  }

};

module.exports = {
  execute: execute
};