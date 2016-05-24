'use strict';
const fun = require('funcy');
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


bot.onText(/(.*)/i, (msg, match) => {

  const _services = [
    {
      regex: /\.reduce/,
      fn: (bot, msg, match) => bot.sendMessage(msg.chat.id, 'Resposta do reduce: ' + eval(msg.text))
    },
    {
      regex: /\.map/,
      fn: (bot, msg, match) => bot.sendMessage(msg.chat.id, 'Resposta do map: ' + eval(msg.text))
    },
    {
      regex: /\.filter/,
      fn: (bot, msg, match) => bot.sendMessage(msg.chat.id, 'Resposta do filter: ' + eval(msg.text))
    },
    {
      regex: /\.test/,
      fn: (bot, msg, match) => bot.sendMessage(msg.chat.id, 'Resposta do test: ' + eval(msg.text))
    },
    {
      regex: /Date\.|new Date/,
      fn: (bot, msg, match) => bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + eval(msg.text))
    },
    {
      regex: /^md5\s+([a-zA-Z])+/i,
      fn: (bot, msg, match) => services.md5.execute(bot, msg, match)
    },
    {
      regex: /onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i,
      fn: (bot, msg, match) => services.gmaps.execute(bot, msg, match)
    },
    {
      regex: /^js\s+([a-zA-Z])+/i,
      fn: (bot, msg, match) => services.mdn.execute(bot, msg, match)
    },
    {
      regex: /(Quem|O que|O q|oq) (é|eh|eah|e|significa) ([^?]*)\s?\??/i,
      fn: (bot, msg, match) => services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] })
    },
    {
      regex: /(Math\.)|\(?-?[.0-9]+(\s*[-+\/*]\s*-?[0-9Math]+)+(\)|\b|)/i,
      fn: (bot, msg, match) => services.math.execute(bot, msg)
    },
    {
      regex: /(420)|maconha|weed|marijuana|erva|bagulho|manhuca/i,
      fn: (bot, msg, match) => services.maconha.execute(bot, msg)
    },
    {
      regex: /lol|kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+|h+u+a+s+|j+e+j+e+|h+u+a+h+u+a|h+u+e+h+u+e/i,
      fn: (bot, msg, match) => services.risada.execute(bot, msg)
    },
    {
      regex: /b(oa|om) (dia|tarde|noite)/i,
      fn: (bot, msg, match) => services.saudacao.execute(bot, msg, match)
    }
  ];

  if (Array.isArray(match)) {
    _services.forEach((element, index) => {
      //console.log('testando: ', _services[index].regex)
      //console.log('input: ', match[1]);
      //console.log('msg: ', msg);
      if (_services[index].regex.test(msg.text)) {
        var _match = msg.text.match(_services[index].regex)
        _services[index].fn(bot, msg, _match);
      }
    });
  } else {
    if (msg.chat.type == 'private') {
      services.masem.execute(bot, msg);
    }
  }
});

// Pares
/*bot.onText(/^par/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1]
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => !(acc % 2));
  bot.sendMessage(msg.chat.id, 'Par(es): ' + _return);
});*/

// Ímpares
/*bot.onText(/^impar/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1]
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => (acc % 2));
  bot.sendMessage(msg.chat.id, 'Ímpar(es): ' + _return);
});*/


// bot.onText(/^md5\s+([a-zA-Z])+/i, (msg, match) => {
//   services.md5.execute(bot, msg, match)
// });
// GMaps
// bot.onText(/onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i, (msg, match) => {
//   services.gmaps.execute(bot, msg, match);
// });

// Github
// bot.onText(/(gh|github|repo|repository|repositório|repositorio) ([^?]*)\??/i, (msg, match)  => {
//   services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
// });

// MDN
// bot.onText(/^js\s+([a-zA-Z])+/i, (msg, match) => {
//   services.mdn.execute(bot, msg, match);
// });

// Wikipedia
/*bot.onText(/(Quem|O que|O q|oq) (é|eh|eah|e|significa) ([^? ]*) ?\??/i, (msg, match) => {
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
});*/