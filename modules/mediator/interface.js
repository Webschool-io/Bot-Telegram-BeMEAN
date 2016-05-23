'use strict';

/*
  Esse Mediator trabalha com REGEX em vez de EVENOS especificamente para BOTS
*/

const Mediator = {

  const add = require('./add');
  const on = require('./on');
  const emmit = require('./emmit');
  const remove = require('./remove');
  const _mediator = {
    add
  , on
  , emmit
  , remove
  }
  return _mediator;
}

module.exports = Object.seal(Mediator);

