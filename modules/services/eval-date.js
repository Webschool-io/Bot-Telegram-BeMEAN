<<<<<<< HEAD
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

const _getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

const _getNewPhrase = (msg) => {
  let random
  , mem = memory[msg.chat.id];
  random = mem ? _getRandom(answers.filter(x => x != mem)) : _getRandomPhrase(answers);
  memory[msg.chat.id] = random;
  return random;
}

module.exports = {
  execute
=======
'use strict';

const _eval = 'Date';
const isOk = require('../utils/regexutils').isInputOK;
const safeEval = require('sewe');
const s = require('../settings');

const execute = (bot, msg) => {
  if (s.getGlobal('evals', (err, data) => {
    if (data === 'true') {
      if (isOk(msg.text)) {
        bot.sendMessage(msg.chat.id, _eval + ': ' + safeEval(msg.text)).catch(console.log);
      } else {
        require('../utils/monitutils').notifyAdmins(bot, 'Eval malicioso detectado: `' + msg.text + '`. Enviado por: ' + msg.from.id + ', ' + msg.from.first_name + ' ' + msg.from.last_name + ', @' + msg.from.username);
        bot.sendMessage(msg.chat.id, 'Aaaaaaah! Espertinho você, em! Esse comando não é permitido não, jovem. O @osuissa e o @rmunhoz foram avisados sobre isso e, se pá, nunca mais respondo uma mensagem sua.').catch(console.log);
      }
    } else {
      bot.sendMessage(msg.chat.id, 'Desculpa, evals estão desabilitados no momento');
    }

  }));
};

module.exports = {
  execute
>>>>>>> Refactored a lot of files
};