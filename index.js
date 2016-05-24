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

// command1@BeMEANoficial_bot
bot.onText(/^\/command1@BeMEANoficial_bot/i, (msg, match) => {
  bot.sendMessage(msg.chat.id, 'ESSE COMANDO NAO EXISTE PORRAA!!!!');
});


// Date
bot.onText(/Date\.|new Date/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + eval(msg.text));
});

// md5
bot.onText(/^md5\s+([a-zA-Z])+/i, (msg, match) => {
  services.md5.execute(bot, msg, match);
});

// Funções JS
// reduce

// _services.forEach( function(element, index) {
//   bot.onText(element.regex, element.fn);
// });

bot.onText(/\.\w+\(/i, (msg, match) => {

    console.log('match', match)
  const _services = [
    { member: 'reduce', regex: /\.reduce/
    , fn: (bot, msg) => bot.sendMessage(msg.chat.id, 'Resposta do reduce: ' + eval(msg.text))
    }
  , { member: 'map', regex: /\.map/
    , fn: (bot, msg) => bot.sendMessage(msg.chat.id, 'Resposta do map: ' + eval(msg.text))
    }
  , { member: 'filter', regex: /\.filter/
    , fn: (bot, msg) => bot.sendMessage(msg.chat.id, 'Resposta do filter: ' + eval(msg.text))
    }
  ];
  // services.mdn.execute(bot, msg, match);
  _services.forEach( function(element, index) {
    var _matchs = match[0].match(element.regex);
      console.log(' _matchs', _matchs)
    if(Array.isArray(_matchs)) {
      console.log('achou _matchs', _matchs)
      switch(_matchs[0]){
        case '.reduce': _services.reduce.fn(bot, msg);
        break;
        case '.filter': _services.filter.fn(bot, msg);
        break;
        case '.map': _services.map.fn(bot, msg);
        break;
        default: bot.sendMessage(msg.chat.id, 'FUUUUU!!!')
      }
    }
  });
});
// map
// bot.onText(/\.map/, (msg, match) => {
//   // services.mdn.execute(bot, msg, match);
//   bot.sendMessage(msg.chat.id, 'Resposta do map: ' + eval(msg.text));
// });
// filter
// bot.onText(/\.filter/, (msg, match) => {
//   // services.mdn.execute(bot, msg, match);
//   bot.sendMessage(msg.chat.id, 'Resposta do filter: ' + eval(msg.text));
// });
// test
bot.onText(/\.test/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  // /^hello/.test('STRING')
  bot.sendMessage(msg.chat.id, 'Resposta do test: ' + eval(msg.text));
});
// Pares
bot.onText(/^par/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1]
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => !(acc % 2));
  bot.sendMessage(msg.chat.id, 'Par(es): ' + _return);
});
// Ímpares
bot.onText(/^impar/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1]
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => (acc % 2));
  bot.sendMessage(msg.chat.id, 'Ímpar(es): ' + _return);
});


// GMaps
bot.onText(/onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i, (msg, match) => {
  let url = require('url');
  services.gmaps.execute(bot, msg, match);
});

// Github
bot.onText(/(gh|github|repo|repository|repositório|repositorio) ([^?]*)\??/i, (msg, match)  => {
  services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
});

// MDN
bot.onText(/^js\s+([a-zA-Z])+/i, (msg, match) => {
  services.mdn.execute(bot, msg, match);
});

// Wikipedia
bot.onText(/(Quem|O que|O q|oq) (é|eh|eah|e|significa) ([^? ]*) ?\??/i, (msg, match) => {
  services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
});

// calcular
bot.onText(/(Math\.)|\(?-?[.0-9]+(\s*[-+\/*]\s*-?[0-9Math]+)+(\)|\b|)/i, (msg, match) => {
  services.math.execute(bot, msg);
});

bot.onText(/(420)|maconha|weed|marijuana|erva|bagulho/i, (msg, match) => {
  services.maconha.execute(bot, msg);
});

// risada
bot.onText(/lol|kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+|h+u+a+s+|j+e+j+e+|h+u+a+h+u+a|h+u+e+h+u+e/i, (msg, match) => {
  services.risada.execute(bot, msg);
});

// saudação
bot.onText(/b(oa|om) (dia|tarde|noite)/i, (msg, match) => {
  services.saudacao.execute(bot, msg, match);
});