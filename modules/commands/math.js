"use strict";

const math = require("mathjs");

const execute = (msg, match, bot) => {
  if (match[1]) {
    bot.sendMessage(msg.chat.id, `Resultado: \`${math.eval(match[2])}\``, {
      parse_mode: "Markdown",
      reply_to_message_id: msg.chat.id
    });
  } else {
    bot.sendMessage(msg.chat.id, "Cadê a expressão matemática, jovem? ¬¬''");
  }
};

module.exports = {
  execute: execute,
  numParams: 1
};
