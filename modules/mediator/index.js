'use strict';

console.log('MEDIATOR');
const Mediator = require('./interface');
const Commands = require('./../commands');
/*
{
    'echo': echo,
    'ping': ping,
    'id': id,
    'start': start,
    'webschool': webschool,
    'help': help
}
*/

Mediator.members = [];


Mediator.add = (member, regex, fn) => {
  console.log('Mediator add')
  const _obj = {};
  _obj[member] = {regex, fn}
  Mediator.members.push(_obj);
  console.log('Mediator.members', Mediator.members)
};


// bot.onText(/Date\.|new Date/, (msg, match) => {
//   // services.mdn.execute(bot, msg, match);
//   bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + eval(msg.text));
// });
module.exports = Mediator;

