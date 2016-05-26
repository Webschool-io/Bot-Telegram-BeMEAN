'use strict';

const _eval = 'map';
const execute = (bot, msg, match) => {
  if( !(/require/.test(msg.text)) )
    bot.sendMessage(msg.chat.id, _eval + ': ' + eval(msg.text));
};

module.exports = {
  execute: execute
}