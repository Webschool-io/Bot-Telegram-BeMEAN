'use strict';

const answers = [
  'Tua mãe!',
  'Me respeita, jovem!',
  'Falou o inteligentão',
  'Falou o cara que xinga um robô ¬¬\'',
  'Tá achando ruim? Faz melhor =)',
  'Magoei :\'(',
  'Depois vem me pedir pra fazer as coias ¬¬\'',
  'Oloco, xinga não, jovem :/',
  'Se vira aí então, troxa',
  'Aff, vou embora então!'
];

const s = require('../settings');

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg);
  });
}

const _execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)]);
};

module.exports = {
  execute: execute
};