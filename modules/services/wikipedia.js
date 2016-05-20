'use strict';

var execute = (bot, msg, arg) => {

    const options = { query: arg, format: 'html', summaryOnly: true, lang: 'pt' };
    try {
        const request = require('request');
        const cheerioAdv = require('cheerio-advanced-selectors');
        const cheerio = cheerioAdv.wrap(require('cheerio'));
        console.log('iniciando');
        request('https://pt.wikipedia.org/wiki/' + args.replace(" ", "_"), function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const teste = $('#bodyContent #mw-content-text p:first').text();
                console.log('teste', teste);
                bot.sendMessage(msg.chat.id, teste);
            } else if (error) {
                const mili = new Date().getTime();
                bot.sendMessage(msg.chat.id, "Droga, deu um erro aqui em :/ ID do erro: `" + mili + "`", { 'parse_mode': 'Markdown' });
                console.log("Erro " + mili + ": " + error);
            } else {
                if (response.statusCode == 404) {
                    bot.sendMessage(msg.chat.id, "Vish, a Wikipedia não tem nada sobre " + arg);
                }
            }
        });
    } catch (e) {
        bot.sendMessage(msg.chat.id, "Putz, não tô conseguindo conversar com a Wikipedia :/ Tenta depois `" + e + "`", { 'parse_mode': 'Markdown' });
    }
}

module.exports = {
    execute: execute
}