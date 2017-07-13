'use strict'

const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
]

const s = require('../settings')

let counter = 0
let memoization = []

const memoize = (rand) => {
  if (rand !== memoization[memoization.length - 1]) { memoization.push(rand) } else {
    rand = _rand(stickers)
    memoization.push(rand)
  }
}
const testMemoization = (stckr) => {
  console.log('stckr', stckr)
  if (memoization[memoization.length - 1] === stckr) {
    console.log('memoization[memoization.length-1] === stckr', memoization[memoization.length - 1] === stckr)
    const _return = _rand(stickers)
    console.log('_return', _return)
    return _return
  }
  return stckr
}
const _rand = (stickers) => Math.floor(Math.random() * stickers.length)

const execute = (bot, msg) => {
  let stckr = testMemoization(_rand(stickers))
  console.log('execute stckr', stckr)
  const reply = { 'reply_to_message_id': msg.message_id }
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, stckr, reply).catch(console.log)
  })
}

module.exports = {
  execute
}
