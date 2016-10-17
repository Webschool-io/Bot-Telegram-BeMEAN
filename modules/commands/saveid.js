'use strict';

const use = "Uso: `/saveid ID_DA_CONVERSA ALIAS`";

const idu = require('../utils/idutils');

const execute = (msg, match, bot) => {
  if (match[2] && match[2].split(' ').length < 2) {
    const vals = match[2].split(' ');
    const id = vals[1];
    const key = vals[2];

    bot.sendMessage(msg.chat.id, JSON.stringify(match));

    idu.add(key, id)
      .then((data) => {
        bot.sendMessage(msg.chat.id, `ID ${id} salvo como ${key}`);
      })
      .catch((err) => {
        bot.sendMessage(msg.chat.id, `Erro ao salvar o ID ${id}`);
      });
  } else {
    bot.sendMessage(msg.chat.id, use, { parse_mode: 'Markdown' });
  }
}

module.exports = {
  execute,
  numParams: 0
}