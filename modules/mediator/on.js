'use strict';

module.exports = (bot, regex, fn) => {
  bot.onText(regex, fn);
};