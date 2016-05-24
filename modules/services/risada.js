'use strict';

const risadas = [
  'hehehehehe',
  'hahahahaha',
  'hauhauhauh',
  'kkkkkkkkkk',
  'ri litros ahuah'
]

const execute = (bot, msg, args) => {
  console.log('Risada: ' + args[0]);
  bot.sendMessage(msg.chat.id, risadas[Math.floor(Math.random() * risadas.length)]);
}

module.exports = {
  execute: execute
}