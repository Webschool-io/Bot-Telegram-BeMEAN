const answers = [
  'Saiu porque não aguentou a pressão!',
  'Já vai tarde!',
  'Tchau, querida!'
  '“I’ll be back.”',
  'Que a força esteja com você!',
  'Hasta la vista, baby!',
  'Pede pra sair, 01!'
];

import s from '../settings';

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg);
  });
}

const _execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)]).catch(console.log);
};

export default {
  execute
};
