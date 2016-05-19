'use strict';

const echo = require('./commands/echo');
const ping = require('./commands/ping');
const id = require('./commands/id');
const start = require('./commands/start');
const webschool = require('./commands/webschool');

module.exports = {
    'echo': echo,
    'ping': ping,
    'id': id,
    'start': start,
    'webschool': webschool
}