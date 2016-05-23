'use strict';

let date = new Date()
let horas = date.getUTCHours() - 3;
let minutos = date.getMinutes();

const messages = {
  "ok": "Opa, b%ao% %pr%, jovem!",
  "wrongPeriod": "B%ao% %pu%, jovem? Agora são " + horas + "h" + minutos + "! Você devia regular seus horários!"
}

const execute = (bot, msg, match) => {
    const pu = match[2];
    let pr = "";
    if (horas <= 12) {
        pr = "dia";
    } else if (horas > 12 && horas <= 18) {
        pr = "tarde";
    } else if (horas > 18) {
        pr = "noite";
    }

    if (pr == pu.toLowerCase()) {
        bot.sendMessage(msg.chat.id, messages.ok.replace("%ao%", match[1]).replace("%pr%", pr), { 'reply_to_message_id': msg.message_id });
    } else {
        bot.sendMessage(msg.chat.id, messages.wrongPeriod.replace("%ao%", match[1]).replace("%pu%", pu), { 'reply_to_message_id': msg.message_id });
    }
}

module.exports = {
    execute: execute
}