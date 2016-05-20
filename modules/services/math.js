'use strict';

/**
 * Função principal do módulo
 * 
 * @param bot Objeto bot a ser utilizado para enviar as mensagens
 * @param msg Objeto mensagem a ser utilizado para se obter  o id
 * @param args Objeto contento o cálcula a ser feito
 */
 var execute = (bot, msg, args) => {
  const matchDate = /([0-9]{2}\/[0-9]{2}\/[0-9]{4}|[0-9]{2}\/20[0-9]{2})/;
  const _return = 'Calculando: `' + msg.text + ' = ' + eval(msg.text)+'`';
  if(!matchDate.test(msg.text)) bot.sendMessage(msg.chat.id, _return);
}

module.exports = {
  execute: execute
}