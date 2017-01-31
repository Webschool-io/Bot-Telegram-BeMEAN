'use strict';

const msgDefault = "Powered by *Webschool*!";
const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault, {'parse_mode': 'Markdown'}).catch(console.log);

module.exports = {
  'execute': execute,
  'numParams': 0
};