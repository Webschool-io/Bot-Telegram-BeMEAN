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

const execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)]);
};

module.exports = {
  execute: execute
};