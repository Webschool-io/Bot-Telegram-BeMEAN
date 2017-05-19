'use strict';

const answers = [
  'Welcome to the jungle, baby!',
  'Bem vindo ao Inferno!',
  'Não quer entrar para tomar uma chícara de café?',
  'Welcome, bitch :P',
  'Aooooooooo fio! Bem vindo :D',
  'Eaeeeeeeeeeee xD',
  'Olaaaar ^^',
  'Ih, alá, chegou mais um! Bem vindo :D'
];

const s = require('../settings');

const memory = {};

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg);
  });
}

const _execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, _getNewPhrase(msg)).catch(console.log);
};

const _getRandomPhrase() => answers[Math.floor(Math.random() * answers.length)];

const _getNewPhrase(msg) => {
  let random
  , mem = memory[msg.chat.id];
  if(mem) {
    do {
      random = _getRandomPhrase();
    } while (random == mem);
    return random;
  }
  random = _getRandomPhrase();
  memory[msg.chat.id] = random;
  return random;
}

module.exports = {
  execute
};
