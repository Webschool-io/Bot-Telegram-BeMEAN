'use strict';

const wikipedia = require('./services/wikipedia');
const math = require('./services/math');
const maconha = require('./services/maconha');
const risada = require('./services/risada');
const gmaps = require('./services/gmaps');
const mdn = require('./services/mdn');

module.exports = {
  wikipedia: wikipedia,
  math: math,
  maconha: maconha,
  risada: risada,
  gmaps: gmaps,
  mdn: mdn
}