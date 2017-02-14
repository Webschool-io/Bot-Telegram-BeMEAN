'use strict';

const msgDefault = "Opa, beleza? Sou o bot do BeMEAN. Não sabe o que é BeMEAN?! Corre! http://webschool.io";

const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault).catch(console.log);
module.exports = {
  'execute': execute,
  'numParams': 0
};