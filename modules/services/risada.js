'use strict';

const limite = 3;
const risadas = [
  'hehehehehe',
  'hahahahaha',
  'hauhauhauh',
  'kkkkkkkkkk',
  'ri litros ahuah'
]

let contadores = [];

const execute = (bot, msg, args) => {
  console.log(contadores);
  let contagem = contadores[msg.chat.id];
  if ((contagem && contagem >= limite) || msg.chat.type == 'private') {
    bot.sendMessage(msg.chat.id, risadas[Math.floor(Math.random() * risadas.length)]);
    if (msg.chat.type != 'private') {
      contadores[msg.chat.id] = 0;
    }
  } else if (!contagem) {
    contadores[msg.chat.id] = 1;
  } else if (contagem < limite) {

  }
}

module.exports = {
  execute: execute
}