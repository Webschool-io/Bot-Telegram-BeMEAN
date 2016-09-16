'use strict';

const request = require('request');
const s = require('../settings');
const pm = {'parse_mode': 'Markdown'};

const API_URL = 'http://www.qualeagiria.com.br/giria_telegram/?giria=';

const messages = {
  requestError: "Droga, deu um erro aqui em :/ ID do erro: `%mili%`",
  consoleRequestError: "Erro %mili%: %err%",
  communicationError: "Putz, não tô conseguindo conversar com o Qual é a Gíria :/ Tenta depois ```%e%```",
};

const wikipedia = require('./wikipedia');

const parseResponse = (err, res, html, args, bot, msg) => {
  let answer;
  if (!err) {

    let results = JSON.parse(html);

    if (Array.isArray(results) && results.length > 0) {
      answer = results[0];
      let text = `Segundo o qualeagiria: _"${answer.description.charAt(0).toUpperCase() + answer.description.slice(1)}"_`;
      if (results.length > 1) {
        text += '\n\nGírias parecidas:\n';
        results.forEach((el) => {
          if (el.name != answer.name) text += `${el.name}\n`
        });
      }
      text += '\nFonte: http://www.qualeagiria.com.br';
      bot.sendMessage(msg.chat.id, text, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{
            text: "Mais informações",
            url: answer.slug
          }]]
        }
      })
      ;
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
      const _url = API_URL + args.query.toLowerCase();
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