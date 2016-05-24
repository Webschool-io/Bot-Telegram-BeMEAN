'use strict';

console.log('MEDIATOR');
const Mediator = require('./interface');
const Commands = require('./../commands');

Mediator.members = [];


Mediator.add = (bot, member, regex, fn) => {
  const _obj = {};
  _obj[member] = {regex, fn}
  Mediator.members.push(_obj);
  // bot.onText(regex, fn);
  // console.log('Mediator.members', Mediator.members)
};

Mediator.on = (bot, regex, fn) => {
  bot.onText(regex, fn);
  console.log('member', member)
  console.log('regex, fn', regex, fn)
  // Mediator.members[member].fn(bot, msg)
  // console.log('bot.onText(regex, fn)', regex, fn)
}


// bot.onText(/Date\.|new Date/, (msg, match) => {
//   // services.mdn.execute(bot, msg, match);
//   bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + eval(msg.text));
// });
module.exports = () => {
  return Mediator
};

