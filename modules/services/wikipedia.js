'use strict';

//Requires
const request = require('request');
const duckduckgo = require('./duckduckgo');
const cheerioAdv = require('cheerio-advanced-selectors');
const cheerio = cheerioAdv.wrap(require('cheerio'));

//Strings
const pm = {'parse_mode': 'Markdown'};
const ph = {'parse_mode': 'HTML'};
const messages = {
  coordsNotFound: "*Vish, não achei as coordenadas, mas aí vai a definição: *\n",
  requestError: "Droga, deu um erro aqui em :/ ID do erro: `%mili%`",
  consoleRequestError: "Erro %mili%: %err%",
  noResultsFound: "Vish, a Wikipedia não tem nada sobre ",
  communicationError: "Putz, não tô conseguindo conversar com a Wikipedia :/ Tenta depois `%e%`"
};

const s = require('../settings');

// Makes HTML more compatible to https://core.telegram.org/bots/api#html-style

/**
 * Realiza o parse de uma response vinda do request
 */
const parseResponse = (err, res, html, args, bot, msg, _url) => {
  if (!err) {
    switch (res.statusCode) {
      case 200:
        const $ = cheerio.load(html);
        //noinspection JSJQueryEfficiency,JSJQueryEfficiency,JSJQueryEfficiency
        const answers = {
          quickDef: $('#bodyContent #mw-content-text p:first').not('.coordinates').text(),
          longDef: $('#bodyContent #mw-content-text p').not('.coordinates').text().substr(0, 300)
        };

        var answer = answers.quickDef;

        answer = (answer == "") ? answers.longDef : answer;
        const _return = 'Segundo a Wikipédia: "<i>' + answer.replace(/\[[^]]*]/, "") + '</i>". fonte: ' + _url;

        bot.sendMessage(msg.chat.id, _return, ph);
        break;
      case 404:
        duckduckgo.execute(bot, msg, args);
        break;
    }
  } else {
    const mili = new Date().getTime();
    bot.sendMessage(msg.chat.id, messages.requestError.replace("%mili%", mili), pm);
    console.log(messages.consoleRequestError.replace("%mili%", mili).replace("%err%", err));
  }
};

/**
 * Função principal do módulo
 *
 * @param bot Objeto bot a ser utilizado para enviar as mensagens
 * @param msg Objeto mensagem a ser utilizado para se obter  o id
 * @param args Objeto contento o tipo de pesquisa a realizar(wh) e o termo pesquisado (query)
 */
var _execute = (bot, msg, args) => {
  // console.log('args', args.query, args.query.toLowerCase().match(/o seu criador/i))
  if (args.query.toLowerCase() == 'o seu criador') {
    console.log('quem é o seu criador');
    s.get(msg.chat.id, 'stickers', (err, data) => {
      if (data == 'true') bot.sendSticker(msg.chat.id, 'BQADAQADGgADt-CfBCZz7J0kak9nAg', {'reply_to_message_id': msg.message_id});
      else bot.sendMessage(msg.chat.id, 'https://github.com/Webschool-io/Bot-Telegram-BeMEAN');
    });
  }
  else {
    try {
      const _url = 'https://pt.wikipedia.org/w/index.php?title=' + args.query.toLowerCase().split(" ").join("_");
      request(_url, (err, res, html) => {
        parseResponse(err, res, html, args, bot, msg, _url);
      });
    }
    catch (e) {
      bot.sendMessage(msg.chat.id, messages.communicationError.replace("%e%", e), pm);
    }
  }
};

const execute = (bot, msg, args) => {
  s.get(msg.chat.id, 'search', (err, data) => {
    if (data == 'true') _execute(bot, msg, args);
  })
};

module.exports = {
  execute: execute
};