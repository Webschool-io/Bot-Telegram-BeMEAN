'use strict'

const math = require('mathjs')

const execute = (msg, match, bot) => {
  if (match[1]) {
    const result = `\`${match[2]}\` = \`${math.eval(match[2])}\``
    bot.sendMessage(msg.chat.id, result, {
      parse_mode: 'Markdown'
    })
  } else {
    bot.sendMessage(msg.chat.id, "Cadê a expressão matemática, jovem? ¬¬'")
  }
}

module.exports = {
  execute: execute
}
