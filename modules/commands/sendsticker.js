'use strict';

const execute = (msg, match, bot) => {
    bot.sendSticker(msg.chat.id, match[1]);
}

module.exports = {
    execute: execute,
    'numParams': 1
}