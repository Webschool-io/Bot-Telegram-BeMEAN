'use strict';

const execute = (msg, match, bot) => {
    try {
        bot.sendSticker(msg.chat.id, match[2]);
    } catch (Ex) {
        bot.sendMessage(msg.chat.id, "Erro ao enviar sticker: `" + ex + "`", { 'parse_mode': 'Markdown' });
    }
}

module.exports = {
    execute: execute,
    'numParams': 1
}