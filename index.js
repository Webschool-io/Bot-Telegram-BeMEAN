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

bot.onText(/(Quem|O que|O q|oq|Onde|Cadê|Cade) (é|eh|eah|e) ([^?]*)\??/i, (msg, match) => {
  services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
});

bot.onText(/kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+/i, (msg, match) => {
  let laughCounter = 0;
  bot.sendMessage(msg.chat.id, 'hehehehehe');

  // chatCtx.laughCounter++
  // if chatCtx.laughCounter > 1
  //   if chatCtx.laughCounter is 3
  //     sendMsg chatID, rand ['Tá tá...', ':-)', 'nem teve tanta graça']
  //   if chatCtx.laughCounter is 5
  //     sendMsg chatID, rand ['como riem!', 'já deu...', 'nem teve tanta graça']
  // else
  //   sendMsg chatID, rand ['hehe...', 'hehehehe!', 'hihihi...', 'Rá!']
  //   timeout 60*30, -> chatCtx.laughCounter = 0
  //   # esse timeout não funciona se reactCtx for persistido entre execuções.

});

