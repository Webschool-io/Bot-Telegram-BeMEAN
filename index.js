'use strict';

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');

// Matches commands
const all = require('./modules/commandsStatic/');
bot.onText(/\/([a-zA-Z]+) ?(.+)?/, all);

// Quem é
// /^quem é/i
const quemE = require('./modules/quemE/');
bot.onText(/^quem é/i, quemE);