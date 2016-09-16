'use strict';

const modules = require('../index');
const commands = modules.commands;
const username = process.env.USERNAME || '@bemean_oficialbot';

const handle = (bot, msg, match) => {
  if ((match[3] && match[3] == username) || !match[3]) {
    let command = match[1];
    if (command) {
      if (command in commands) {
        command = commands[command];
        let argsCount = match.length - 2;
        if (argsCount >= command.numParams) {
          command.execute(msg, match, bot);
        } else {
          bot.sendMessage(msg.chat.id, "Ops, número incorreto de parâmetros fornecidos (" + argsCount + "). Número de parâmetros exigidos: " + command.numParams + " :/");
        }
      } else {
        if (match[3]) bot.sendMessage(msg.chat.id, "Eita, esse comando não existe :/");
      }
    }
  }
};

module.exports = {
  handle
};