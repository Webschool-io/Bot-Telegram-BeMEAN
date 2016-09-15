'use strict';

const safeEval = require('sewe');
const TelegramBot = require('node-telegram-bot-api');
if (process.env.server != 'heroku') require('dotenv').config();

const Mediator = require('./modules/mediator/');

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');
const services = require('./modules/services');

// Matches commands
bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?/, (msg, match) => {
  var command = match[1];
  var args = match[2];
  if (command) {
    if (command in commands) {
      command = commands[command];
      if (match.length > command.numParams) {
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

// Funções JS
// reduce
bot.onText(/\.reduce/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do reduce: ' + safeEval(msg.text));
});
// map
bot.onText(/\.map/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do map: ' + safeEval(msg.text));
});
// filter
bot.onText(/\.filter/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  bot.sendMessage(msg.chat.id, 'Resposta do filter: ' + safeEval(msg.text));
});
// test
bot.onText(/\.test/, (msg, match) => {
  // services.mdn.execute(bot, msg, match);
  // /^hello/.test('STRING')
  bot.sendMessage(msg.chat.id, 'Resposta do test: ' + safeEval(msg.text));
});
// Pares
bot.onText(/^par/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1];
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => !(acc % 2));
  bot.sendMessage(msg.chat.id, 'Par(es): ' + _return);
});
// Ímpares
bot.onText(/^impar/i, (msg, match) => {
  const _arr = msg.text.split('par ')[1];
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => (acc % 2));
  bot.sendMessage(msg.chat.id, 'Ímpar(es): ' + _return);
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

// Services
const _services = [];
// Date
var serviceName = 'date';
var _obj = {
  member: 'date'
  , regex: /Date\.|new Date/
  , fn: (msg, match) => {
    bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + safeEval(msg.text));
  }
};
_services.push(_obj);
var _obj = {};

// md5
var serviceName = 'md5';
var _obj = {
  member: serviceName
  , regex: /^md5\s+([a-zA-Z])+/i
  , fn: (msg, match) => {
    // console.log('serviceName', serviceName)
    services[serviceName].execute(bot, msg, match);
  }
};
_services.push(_obj);
var _obj = {};

// GMaps
var serviceName = 'gmaps';
var _obj = {
  member: serviceName
  , regex: /onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i
  , fn: (msg, match) => {
    services[serviceName].execute(bot, msg, match);
  }
};
_services.push(_obj);
var _obj = {};

// MDN
var serviceName = 'mdn';
var _obj = {
  member: serviceName
  , regex: /^js\s+([a-zA-Z])+/i
  , fn: (msg, match) => {
    services[serviceName].execute(bot, msg, match);
  }
};
_services.push(_obj);
var _obj = {};

// Wikipedia
var serviceName = 'wikipedia';
var _obj = {
  member: serviceName
  , regex: /(Quem|O que|O q|oq) (é|eh|eah|e|significa) ([^? ]*) ?\??/i
  , fn: (msg, match) => {
    console.log('wikipedia');
    const parse = { 'wh': match[1], 'query': match[3] };
    services.wikipedia.execute(bot, msg, parse);
    // require('./modules/mediator/wikipedia')(bot, msg, parse)
  }
};
_services.push(_obj);
var _obj = {};

_services.forEach(function (element, index) {
  Mediator.add(bot, element.member, element.regex, element.fn);
  Mediator.on(bot, element.regex, element.fn);
});
// Mediator.on(bot, 'wikipedia');

