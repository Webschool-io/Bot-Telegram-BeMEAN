'use strict';

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');
const services = require('./modules/services');

// Matches commands

bot.onText(/.*/, (msg, match) => {
    console.log('RECEBI MSG: ' + msg);
    const _MSG = "Recebi a mensagem : ...";
    bot.sendMessage(msg.chat.id, _MSG);
});

bot.onText(/\/([a-zA-Z]+) ?(.+)?/, (msg, match) => {
    var command = match[1];
    var args = match[2];
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
bot.onText(/Quem é (.*)?/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Quem é... ");
    console.log('Received query: ' + match);
    var term = match[1];
    if(term && term != ""){
        services.wikipedia.execute(bot, msg, term);
    } else {
        bot.sendMessage(msg.chat.id, "Quem é... tem que me dizer por quem procurar, jovem...");
    }
});

// 'use strict';

// const TelegramBot = require('node-telegram-bot-api');
// require('dotenv').config();

// const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// // Setup polling way
// const bot = new TelegramBot(token, { polling: true });

// const commands = require('./modules/commands');

// // Matches commands
// const all = require('./modules/commandsStatic/');
// bot.onText(/\/([a-zA-Z]+) ?(.+)?/, all);

// // Quem é
// // /^quem é/i
// const quemE = require('./modules/quemE/');
// bot.onText(/^quem é/i, quemE);