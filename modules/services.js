'use strict';

const evalDate = require('./services/eval-date');
const evalFilter = require('./services/eval-filter');
const evalMap = require('./services/eval-map');
const evalRduce = require('./services/eval-reduce');
const evalTest = require('./services/eval-test');
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
const gme = require('./services/gme');
const npm = require('./services/npm');
// const evalReduce = require('./services/eval-reduce');
// const evalMap= require('./services/eval-map');
// const evalFilter = require('./services/eval-filter');
// const evalTest = require('./services/eval-test');
// const evalRDate = require('./services/eval-date');
const stickerHeart = require('./services/sticker-heart');
const stickerHappy = require('./services/sticker-happy');
const stickerWebschool = require('./services/sticker-webschool');
const stickerBemean = require('./services/sticker-bemean');
//const omdb = require('./services/omdb');
const omdb = require('./services/omdb');

module.exports = {
  wikipedia,
  math,
  maconha,
  risada,
  gmaps,
  mdn,
  md5,
  saudacao,
  masem,
  tuamae,
  gme,
  npm,
  evalDate,
  evalFilter,
  evalMap,
  evalRduce,
  evalTest,
  stickerHeart,
  stickerHappy,
  stickerWebschool,
  stickerBemean,
  omdb
};