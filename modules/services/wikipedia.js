'use strict';

const api = require('wikipedia-js');

var execute = (bot, msg, arg) => {

    const options = { query: arg, format: 'html', summaryOnly: true, lang: 'pt' };
    try {
        api.searchArticle(options, (err, response) => {
            if (err) {
                bot.sendMessage(msg.chat.id, "Eita! Não consegui me comunicar com o servidor da Wikipedia, não, foi mal ae :/");
                return;
            }
            if (response) {
                var parsedResponse = response.replace(/<[^>]+>/, "");
                bot.sendMessage(msg.chat.id, "Achei isso na wikipedia: " + parsedResponse, { 'parse_mode': 'HTML' });
                console.log('Responta da wikipedia: ' + parsedResponse);
            } else {
                bot.sendMessage(msg.chat.id, "Droga, não achei nada sobre " + arg + " na wikipedia! :/");
            }
        });
    } catch (e) {
        bot.sendMessage(msg.chat.id, "Putz, não tô conseguindo conversar com a Wikipedia :/ Tenta depois :1:");
    }
}

module.exports = {
    execute: execute
}