'use strict'

const answers = [
  'Welcome to the jungle, baby!',
  'Bem vindo ao Inferno!',
  'Não quer entrar para tomar uma chícara de café?'
]

const s = require('../settings')
const memory = {}

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'funny', (err, data) => {
    if (data == 'true') _execute(bot, msg)
  })
}

const _execute = (bot, msg) => {
  bot.sendMessage(msg.chat.id, answers[Math.floor(Math.random() * answers.length)]).catch(console.log)
}

const _getRandom = arr => arr[Math.floor(Math.random() * arr.length)]

const _getNewPhrase = (msg) => {
  let random,
    mem = memory[msg.chat.id]
  random = mem ? _getRandom(answers.filter(x => x != mem)) : _getRandomPhrase(answers)
  memory[msg.chat.id] = random
  return random
}

module.exports = {
  execute
}
