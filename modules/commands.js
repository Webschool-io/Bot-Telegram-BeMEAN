'use strict';

const echo = require('./commands/echo');
const ping = require('./commands/ping');
const id = require('./commands/id');
const start = require('./commands/start');
const webschool = require('./commands/webschool');
const help = require('./commands/help');
const par = require('./commands/par');
const impar = require('./commands/impar');
const repo = require('./commands/repo');
const sendsticker = require('./commands/sendsticker');
const log = require('./commands/log');
// const npm = require('./commands/npm');

module.exports = {
    'echo': echo,
    'ping': ping,
    'id': id,
    'start': start,
    'webschool': webschool,
    'help': help,
    'par': par,
    'impar': impar,
    'repo': repo,
    'sendsticker': sendsticker,
    'log': log
    // 'npm': npm
}