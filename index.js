'use strict';
const TelegramBot = require('node-telegram-bot-api');

if (process.env.server != 'heroku') require('dotenv').config();

// Setup polling way
const bot = new TelegramBot(process.env.API_TOKEN || 'INSERT API_TOKEN', {polling: true});

const modules = require('./modules');
const handlers = modules.handlers;

modules.utils.monit.notifySharedAccount(bot, `*Bot ${process.env.USERNAME || '@bemean_oficialbot'} reiniciado.*`);

bot.on('message', (msg) => {
  handlers.message.handle(bot, msg);
});

// Matches commands
bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?(@.*)?/i, (msg, match) => {
  handlers.command.handle(bot, msg, match);
});

bot.onText(/^([^\/]+)/i, (msg, match) => {
  handlers.service.handle(bot, msg, match);
});

bot.on('sticker', (msg) => {
  handlers.sticker.handle(bot, msg);
});

bot.on('location', (msg) => {
  handlers.location.handle(bot, msg);
});