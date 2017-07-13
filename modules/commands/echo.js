'use strict'

module.exports = {
  execute: (msg, match, bot) => bot.sendMessage(msg.chat.id, msg.text.replace('/echo ', ''), {
    'parse_mode': 'Markdown'
  }).catch(console.log)
}
