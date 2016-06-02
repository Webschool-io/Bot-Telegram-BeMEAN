'use strict';

const execute = (msg, match, bot) => {
  bot.sendMessage(msg.chat.id, "Me conheça por dentro: https://github.com/Webschool-io/Bot-Telegram-BeMEAN");
};

module.exports = {
  'execute': execute,
  'numParams': 0
};