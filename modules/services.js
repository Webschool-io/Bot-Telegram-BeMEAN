'use strict';

const wikipedia = require('./services/wikipedia');
const math = require('./services/math');
const maconha = require('./services/maconha');
const risada = require('./services/risada');
const gmaps = require('./services/gmaps');
const mdn = require('./services/mdn');
const md5 = require('./services/md5');
const saudacao = require('./services/saudacao');
const masem = require('./services/masem');
const tuamae = require('./services/tuamae');

module.exports = {
  wikipedia: wikipedia,
  math: math,
  maconha: maconha,
  risada: risada,
  gmaps: gmaps,
  mdn: mdn,
  md5: md5,
  saudacao: saudacao,
  masem: masem,
  tuamae: tuamae
}