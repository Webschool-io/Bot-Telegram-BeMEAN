'use strict';

const msgDefault = "Powered by *Webschool*!";

module.exports = {
    execute: (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault, {'parse_mode': 'Markdown'}).catch(console.log)
};