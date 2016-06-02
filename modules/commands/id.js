'use strict';

const execute = (msg, match, bot) => {
  if (match[2]) {
    if (match[2] == 'user') {
      bot.sendMessage(msg.chat.id, "O id do usuário é: " + msg.from.id);
    } else if (match[2] == 'conv') {
      bot.sendMessage(msg.chat.id, "O id da conversa é: " + msg.chat.id);
    } else {
      bot.sendMessage(msg.chat.id, "Ops, não entendi; Qual id você quer obter 'user' ou 'conv'?");
    }
  } else {
    bot.sendMessage(msg.chat.id, "Id da conversa:  " + msg.chat.id + '\nId do usuário: ' + msg.from.id);
  }
};

module.exports = {
  'execute': execute,
  'numParams': 0
};