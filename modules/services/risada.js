'use strict';

const treta = require('../db/treta');
const monitutils = require('../utils/monitutils');

const limite = 3;
const risadas = [
  'hehehehehe',
  'hahahahaha',
  'hauhauhauh',
  'kkkkkkkkkk',
  'ri litros ahuah'
];

const s = require('../settings');

let contadores = [];

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg);
  });
}

const _execute = (bot, msg) => {
  let contagem = contadores[msg.chat.id];
  if ((contagem && contagem >= limite) || msg.chat.type == 'private') {
    bot.sendMessage(msg.chat.id, risadas[Math.floor(Math.random() * risadas.length)]);
    if (msg.chat.type != 'private') {
      contadores[msg.chat.id] = 0;
    }
  } else if (!contagem) {
    contadores[msg.chat.id] = 1;
  } else if (contagem < limite) {
    contadores[msg.chat.id]++;
  }
  if (msg.type != 'private' && msg.text.indexOf(' ') >= 0) {
    treta.insert({ message: msg.text, group: msg.chat.id }, (err, data) => {
      if (err) monitutils.notifyAdmins(bot, `Erro ao salvar mensagem no banco: ${JSON.stringify(err)}`);
    });
  }
};

module.exports = {
  execute: execute
};