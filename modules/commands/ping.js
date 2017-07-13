'use strict'

module.exports = {
  execute: (msg, match, bot) => bot.sendMessage(msg.chat.id, 'pong').catch(console.log)
}
