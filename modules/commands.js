var echo = require('./commands/echo');
var ping = require('./commands/ping');
var id = require('./commands/id');
var start = require('./commands/start');

module.exports = {
    'echo': echo,
    'ping': ping,
    'id': id,
    'start': start
}