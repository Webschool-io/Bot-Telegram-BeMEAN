'use strict';

const execute = (msg, match, bot) => {
    bot.sendSticker(msg.chat.id, match[2]);
}

module.exports = {
    execute: execute,
    'numParams': 1
}