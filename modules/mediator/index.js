'use strict';

const Mediator = require('./interface');
const Commands = require('./../commands');

Mediator.members = [];


// Mediator.add = (member, regex, fn) => {
//   const _obj = {};
//   _obj[member] = {regex, fn}
//   Mediator.members.push(_obj);
//   console.log('Mediator.members', Mediator.members)
// };

module.exports = Mediator;

