'use strict';

const api = require('wikipedia-js');

var execute = (bot, msg, arg) => {

    const options = { query: arg, format: 'html', summaryOnly: true, land: 'pt' };
    api.searchArticle(options, (err, response) => {
        if(err){
            bot.sendMessage(msg.chat.id, "Eita! Não consegui me comunicar com o servidor da Wikipedia, não, foi mal ae :/");
            return;
        }
        bot.sendMessage(msg.chat.id, response, {'parse_mode':'HTML'});
    });
}

module.exports = {
    execute: execute
}