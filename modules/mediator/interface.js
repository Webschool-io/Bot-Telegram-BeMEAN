'use strict';

/*
 Esse Mediator trabalha com REGEX em vez de EVENOS especificamente para BOTS
 */

const Interface = Object.seal({
  add: require('./add')
  , on: require('./on')
  , members: []
// , emmit
// , remove
});
console.log('no interface.js', Interface.add);
module.exports = Interface;

