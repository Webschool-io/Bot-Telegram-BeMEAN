'use strict';

const request = require('request');
const s = require('../settings');
const pm = {'parse_mode': 'Markdown'};

const messages = {
  requestError: "Droga, deu um erro aqui em :/ ID do erro: `%mili%`",
  consoleRequestError: "Erro %mili%: %err%",
  communicationError: "Putz, não tô conseguindo conversar com o Qual é a Gíria :/ Tenta depois ```%e%```",
  defaultAnswer: "Segundo o qualeagiria: _%description%_. Fonte: http://www.qualeagiria.com.br/"
};

const wikipedia = require('./wikipedia');

const parseResponse = (err, res, html, args, bot, msg) => {
  let answer;
  if (!err) {

    let results = JSON.parse(html);

    if (Array.isArray(results) && results.length > 0) {
      answer = results[0];
      bot.sendMessage(msg.chat.id, messages.defaultAnswer.replace('%description%', answer.description), pm);
    } else {
      wikipedia.execute(bot, msg, args);
    }
  } else {
    const mili = new Date().getTime();
    bot.sendMessage(msg.chat.id, messages.requestError.replace("%mili%", `${mili}`), pm);
    console.log(messages.consoleRequestError.replace("%mili%", `${mili}`).replace("%err%", err));
  }
};

const execute = (bot, msg, args) => {
  if (args.query.toLowerCase() == 'o seu criador') {
    console.log('quem é o seu criador');
    s.get(msg.chat.id, 'stickers', (err, data) => {
      if (data == 'true') bot.sendSticker(msg.chat.id, 'BQADAQADGgADt-CfBCZz7J0kak9nAg', {'reply_to_message_id': msg.message_id});
      else bot.sendMessage(msg.chat.id, 'https://github.com/Webschool-io/Bot-Telegram-BeMEAN');
    });
  }
  else {
    try {
      const _url = 'http://www.qualeagiria.com.br/giria_telegram/?giria=' + args.query.toLowerCase().split(" ").join("_");
      request(_url, (err, res, html) => {
        parseResponse(err, res, html, args, bot, msg, _url);
      });
    }
    catch (e) {
      bot.sendMessage(msg.chat.id, messages.communicationError.replace("%e%", e), pm);
    }
  }
};

module.exports = {
  execute
};