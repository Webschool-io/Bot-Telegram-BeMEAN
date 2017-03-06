"use strict";

const pm = {parse_mode: "Markdown"};
const math = require("mathjs");
const execute = (bot, msg) => {
  const _return = "Resultado: `" + msg.text + " = " + math.eval(msg.text) + "`";
  bot.sendMessage(msg.chat.id, _return, pm).catch(console.log);
};

module.exports = {
  execute
};
