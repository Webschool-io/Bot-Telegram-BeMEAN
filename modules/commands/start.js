'use strict';

const msgDefault = "Ops, nada por aqui ainda. Por favor, volte outro dia =)";
const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault);
module.exports = {
    'execute': execute,
    'numParams': 0
}