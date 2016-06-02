'use strict';

const answers = [
  'Mas em?!',
  'Eu num intindi o quei falô',
  'Quee?!',
  'Não entendi o que cê quer não, jovem',
  'Hm... Tenta de novo, dessa vez de uma forma mais normal',
  'Eu não entendo o que você fala. Você fala de uma maneira...',
  'Aff, fala direito pra eu entender, trem',
  'Ahn... Como?',
  'Mds, escreve direito, não entendi o que cê falou, não ¬¬',
  'Eita, sei lá o que cê quis dizer',
  'Como que é?',
  'Jovem, você precisa melhorar suas habilidades de comunicação...',
  'Por que vocês, humanos, não sabem falar direito?'
];

const execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)]);
};

module.exports = {
  execute: execute
};