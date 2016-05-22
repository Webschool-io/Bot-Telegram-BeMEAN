'use strict';

const dia = /dia/i, tarde = /tarde/i, noite = /noite/i;

const execute = (bot, msg, match) => {

    const date = new Date(), pu = match[2], horas = date.getUTCHours() - 3, minutos = date.getMinutes();
    let pr = "";
    if (horas <= 12) {
        pr = "dia";
    } else if (horas > 12 && horas <= 18) {
        pr = "tarde";
    } else if (horas > 18) {
        pr = "noite";
    }

    if (pr == pu.toLowerCase()) {
        bot.sendMessage(msg.chat.id, "Aoba, b" + match[1] + " " + pr + ", jovem!", { 'reply_to_message_id': msg.message_id });
    } else {
        bot.sendMessage(msg.chat.id, "B" + match[1] + " " + pu + ", jovem? Agora são " + horas + "h" + minutos + "! Você devia regular seus horários!", { 'reply_to_message_id': msg.message_id });
    }

}

module.exports = {
    execute: execute
}