'use strict';

//Requires
const request = require('request');
const duckduckgo = require('./duckduckgo');
const cheerioAdv = require('cheerio-advanced-selectors');
const cheerio = cheerioAdv.wrap(require('cheerio'));

//Strings
const regexOnde = /Onde|ond|cadê|cade/i;
const pm = {'parse_mode': 'HTML'};
const messages = {
  coordsNotFound: "*Vish, não achei as coordenadas, mas aí vai a definição: *\n",
  requestError: "Droga, deu um erro aqui em :/ ID do erro: `%mili%`",
  consoleRequestError: "Erro %mili%: %err%",
  noResultsFound: "Vish, a Wikipedia não tem nada sobre ",
  communicationError: "Putz, não tô conseguindo conversar com a Wikipedia :/ Tenta depois `%e%`"
};

// Makes HTML more compatible to https://core.telegram.org/bots/api#html-style
const simpleHTML = (code) =>
    code.split(/\s+/m).join(' ')
        .replace(/<\/?(p|h[1-6])[^>]*>/gi, '\n\n')
        .replace(/<\/?(br|div|ol|ul)[^>]*>/gi, '\n')
        .replace(/<li[^>]*>/gi, '  • ')
        .replace(/<\/li[^>]*>/gi, '\n')
        .replace(/(<(?!\/?(b|i|a|pre|code))[^>]+>)/g, '')
        .replace(/(<[^\/]>[^<]*)<[^\/]>/g, '$1')
        .replace(/<\/[^>]+>([^<]*<\/[^>]+>)/g, '$1')
        .replace(/<[^>]*$/g, '')
        .replace(/&#([0-9]+);/, (match, g1) => String.fromCharCode(g1))
        .replace(/(\n\s*){3,}/g, '\n\n')
        .replace(/^\s*|\s*$/g, '');

const escapeHTML = (code) =>
    code.replace(/&/gi, '&amp;')
        .replace(/>/gi, '&gt;')
        .replace(/</gi, '&lt;')
        .replace(/"/gi, '&quot;');

/**
 * Realiza o parse de uma response vinda do request
 */
const parseResponse = (err, res, html, args, bot, msg, _url) => {

  const query = args.query;
  const wh = args.wh;
  if (!err) {
    switch (res.statusCode) {
      case 200:
        const $ = cheerio.load(html);
        const answers = {
          quickDef: $('.main-content .repo-list-description').not('.coordinates').text(),
          'link': $('.main-content h3.repo-list-name').text()
        };

        var answer = answers.quickDef;
        const _return = 'Via Github: "' + answer.replace(/\[[^]]*]/, "") + '". fonte: ' + _url;

        bot.sendMessage(msg.chat.id, _return, pm);
        break;
      case 404:
        // bot.sendMessage(msg.chat.id, messages.noResultsFound + query);
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
var execute = (bot, msg, args) => {
  try {
    const _url = 'https://pt.wikipedia.org/w/index.php?title=' + args.query.replace(" ", "_");
    request(_url, (err, res, html) => {
      parseResponse(err, res, html, args, bot, msg, _url);
    });
  }
  catch (e) {
    bot.sendMessage(msg.chat.id, messages.communicationError.replace("%e%", e), pm);
  }
};

module.exports = {
  execute: execute
};