'use strict';

const messages = {
  "ok": "Opa, b%ao% %pr%, jovem!",
  "wrongPeriod": "B%ao% %pu%, jovem? Agora são %horas%h%minutos%! Você devia regular seus horários!"
};

const execute = (bot, msg, match) => {
  let date = new Date();
  let _horas = date.getUTCHours() - 3;
  let horas = _horas < 0 ? _horas + 24 : _horas;
  let minutos = date.getMinutes();
  let ending = match[1].toLowerCase();
  minutos = minutos < 10 ? '0' + minutos : minutos;
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
    bot.sendMessage(msg.chat.id, messages.ok.replace("%ao%", ending).replace("%pr%", pr), {'reply_to_message_id': msg.message_id});
  } else {
    bot.sendMessage(msg.chat.id, messages.wrongPeriod.replace("%ao%", ending).replace("%pu%", pu).replace("%horas%", horas).replace("%minutos%", minutos), {'reply_to_message_id': msg.message_id});
  }
};

module.exports = {
  execute: execute
};