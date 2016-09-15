'use strict';

const _eval = 'map';
const isOk = require('../utils/regexutils').isInputOK;
const safeEval = require('sewe');

const execute = (bot, msg) => {
  if (isOk(msg.text)) {
    bot.sendMessage(msg.chat.id, _eval + ': ' + safeEval(msg.text));
  } else {
    require('../utils/monitutils').notifyAdmins(bot, 'Eval malicioso detectado: `' + msg.text + '`. Enviado por: ' + msg.from.id + ', ' + msg.from.first_name + ' ' + msg.from.last_name + ', @' + msg.from.username);
    bot.sendMessage(msg.chat.id, 'Aaaaaaah! Espertinho você, em! Esse comando não é permitido não, jovem. O @osuissa e o @rmunhoz foram avisados sobre isso e, se pá, nunca mais respondo uma mensagem sua.');
  }
};

module.exports = {
  execute: execute
};