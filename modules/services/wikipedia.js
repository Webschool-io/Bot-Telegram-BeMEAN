'use strict';

//Requires
const request = require('request');
const cheerioAdv = require('cheerio-advanced-selectors');
const cheerio = cheerioAdv.wrap(require('cheerio'));

//Strings
const regexOnde = /Onde|ond|cadê|cade/i;
const pm = { 'parse_mode': 'Markdown' };
const messages = {
    coordsNotFound: "*Vish, não achei as coordenadas, mas aí vai a definição: *\n",
    requestError: "Droga, deu um erro aqui em :/ ID do erro: `%mili%`",
    consoleRequestError: "Erro %mili%: %err%",
    noResultsFound: "Vish, a Wikipedia não tem nada sobre ",
    communicationError: "Putz, não tô conseguindo conversar com a Wikipedia :/ Tenta depois `%e%`",
}

/**
 * Realiza o parse de uma response vinda do request
 */
 var parseResponse = (err, res, html, args, bot, msg) => {
    const query = args.query;
    const wh = args.wh;
    if (!err) {
        switch (res.statusCode) {
            case 200:
            const $ = cheerio.load(html);
            const answers = {
                quickDef: $('#bodyContent #mw-content-text p:first').not('.coordinates').text(),
                coordinates: $('#bodyContent #mw-content-text p.coordinates').text(),
                longDef: $('#bodyContent #mw-content-text p').not('.coordinates').text().substr(0, 300)
            };

            var answer = answers.quickDef;

            if (wh.match(regexOnde)) {
                answer = (answers.coordinates != "") ? answers.coordinates : messages.coordsNotFound + answers.longDef;
            }

            answer = (answer == "") ? answers.longDef : answer;
            const _return = 'A Wikipédia diz que "_' + answer + '_".';

            bot.sendMessage(msg.chat.id, _return.replace(/\[[^]]*\]/, ""), pm);
            break;
            case 404:
            bot.sendMessage(msg.chat.id, messages.noResultsFound + query);
            break;
        }
    } else {
        const mili = new Date().getTime();
        bot.sendMessage(msg.chat.id, messages.requestError.replace("%mili%", mili), pm);
        console.log(messages.consoleRequestError.replace("%mili%", mili).replace("%err%", err));
    }
}

/**
 * Função principal do módulo
 * 
 * @param bot Objeto bot a ser utilizado para enviar as mensagens
 * @param msg Objeto mensagem a ser utilizado para se obter  o id
 * @param args Objeto contento o tipo de pesquisa a realizar(wh) e o termo pesquisado (query)
 */
 var execute = (bot, msg, args) => {
    try {
        request('https://pt.wikipedia.org/w/index.php?title=' + args.query.replace(" ", "_"), (err, res, html) => {
            parseResponse(err, res, html, args, bot, msg);
        });
    } catch (e) {
        bot.sendMessage(msg.chat.id, messages.communicationError.replace("%e%", e), pm);
    }
}

module.exports = {
    execute: execute
}