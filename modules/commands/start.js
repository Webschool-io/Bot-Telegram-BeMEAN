'use strict';

// const msgDefault = "Ops, nada por aqui ainda. Por favor, volte outro dia =)";
const msgDefault = "Sou muito tetudo e macio, porém por hora não tenho nada!";

const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault);
module.exports = {
  'execute': execute,
  'numParams': 0
};