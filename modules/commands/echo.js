var execute = function (msg, match, bot) {
    bot.sendMessage(msg.chat.id, match[2], { 'parse_mode': 'Markdown' });
}

module.exports = {
    'execute': execute,
    'numParams': 1
}