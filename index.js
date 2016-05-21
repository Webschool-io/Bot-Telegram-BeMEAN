'use strict';

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');
const services = require('./modules/services');

// Matches commands
bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?/, (msg, match) => {
  let command = match[1];
  let args = match[2];
  if (command) {
    if (command in commands) {
      command = commands[command];
      if (match.length > command.numParams) {
        if (args) {
          args = args.split(' ');
        }
        command.execute(msg, match, bot);
      } else {
        bot.sendMessage(msg.chat.id, "Ops, número incorreto de parâmetros fornecidos (" + match.length + "). Número de parâmetros exigidos: " + command.numParams + " :/");
      }
    } else {
      bot.sendMessage(msg.chat.id, "Eita, esse comando não existe :/");
    }
  }
});

// Date
bot.onText(/Date\.|new Date/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do Date: '+eval(msg.text));
});

// md5
bot.onText(/^md5\s+([a-zA-Z])+/, (msg, match) => {
  services.md5.execute(bot, msg, match);
});

// reduce
bot.onText(/\.reduce/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do reduce: '+eval(msg.text));
});

// map
bot.onText(/\.map/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do map: '+eval(msg.text));
});

// filter
bot.onText(/\.filter/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do filter: '+eval(msg.text));
});

// GMaps
bot.onText(/onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i, (msg, match) => {
  let url = require('url');
  services.gmaps.execute(bot, msg, match);
});

// MDN
bot.onText(/^js\s+([a-zA-Z])+/i, (msg, match) => {
  services.mdn.execute(bot, msg, match);
});

// Wikipedia
bot.onText(/(Quem|O que|O q|oq|Cadê|Cade) (é|eh|eah|e|significa) ([^?]*)\??/i, (msg, match) => {
  services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
});

// calcular
bot.onText(/(Math\.)|\(?-?[.0-9]+(\s*[-+\/*]\s*-?[0-9Math]+)+(\)|\b|)/i, (msg, match) => {
  services.math.execute(bot, msg);
});

bot.onText(/maconha|weed|marijuana|erva|bagulho/i, (msg, match) => {
  services.maconha.execute(bot, msg);
});

// risada
bot.onText(/kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+/i, (msg, match) => {
  services.risada.execute(bot, msg);
});

// speak
// bot.onText(/^speak\s+([a-zA-Z])+/, (msg, match) => {
//   bot.sendMessage(msg.chat.id, 'Enviando audio de teste ');
//   services.speak.execute(bot, msg, match);
// });
