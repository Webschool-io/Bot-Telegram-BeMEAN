const execute = (bot, msg) => {
    bot.sendMessage(msg.chat.id, 'Localização recebida: `' + JSON.stringify(msg) + '`');
};

module.exports = {
    execute
};