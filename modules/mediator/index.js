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
  const _obj = {};
  _obj[member] = {regex, fn}
  Mediator.members.push(_obj);
  console.log('Mediator.members', Mediator.members)
};

Mediator.on = (bot, element.regex, element.fn) => {
  bot.onText(element.regex, element.fn);
  console.log('bot.onText(element.regex, element.fn)', element.regex, element.fn)
}


// bot.onText(/Date\.|new Date/, (msg, match) => {
//   // services.mdn.execute(bot, msg, match);
//   bot.sendMessage(msg.chat.id, 'Resposta do Date: ' + eval(msg.text));
// });
module.exports = Mediator;

