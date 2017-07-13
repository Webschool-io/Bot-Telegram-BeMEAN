'use strict'

const fs = require('fs')
const execSync = require('exec-sync')

const execute = (bot, msg) => {
  const _txt = msg.text.replace(/['"\\]/g, '')
  const fileName = Math.random().toString() + '.mp3'
  bot.sendMessage(msg.chat.id, 'Enviando audio: ' + fileName).catch(console.log)
}

module.exports = {
  execute
}
