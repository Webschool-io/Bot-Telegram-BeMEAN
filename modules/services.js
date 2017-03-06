"use strict";

const evalDate = require("./services/eval-date");
const evalFilter = require("./services/eval-filter");
const evalMap = require("./services/eval-map");
const evalReduce = require("./services/eval-reduce");
const evalTest = require("./services/eval-test");
const wikipedia = require("./services/wikipedia");
const math = require("./services/math");
const maconha = require("./services/maconha");
const risada = require("./services/risada");
const gmaps = require("./services/gmaps");
const mdn = require("./services/mdn");
const md5 = require("./services/md5");
const saudacao = require("./services/saudacao");
const masem = require("./services/masem");
const tuamae = require("./services/tuamae");
const gme = require("./services/gme");
const npm = require("./services/npm");
const stickerHeart = require("./services/sticker-heart");
const stickerHappy = require("./services/sticker-happy");
const stickerWebschool = require("./services/sticker-webschool");
const stickerBemean = require("./services/sticker-bemean");
const omdb = require("./services/omdb");
const whereami = require("./services/whereami");
const config = require("./services/config");
const zoeiro = require("./services/zoeiro");
const qualeagiria = require("./services/qualeagiria");

const defs = [
  {
    member: "reduce",
    regex: /\.reduce/,
    fn: (bot, msg, match) => services.evalReduce.execute(bot, msg),
    eval: true
  },
  {
    member: "map",
    regex: /\.map/,
    fn: (bot, msg, match) => services.evalMap.execute(bot, msg),
    eval: true
  },
  {
    member: "filter",
    regex: /\.filter/,
    fn: (bot, msg, match) => services.evalFilter.execute(bot, msg),
    eval: true
  },
  {
    member: "test",
    regex: /^regex (.+)/i,
    fn: (bot, msg, match) => services.evalTest.execute(bot, msg),
    eval: true
  },
  {
    member: "date",
    regex: /Date\.|new Date/,
    fn: (bot, msg, match) => services.evalDate.execute(bot, msg),
    eval: true
  },
  {
    member: "md5",
    regex: /^md5\s+([a-zA-Z])+/i,
    fn: (bot, msg, match) => services.md5.execute(bot, msg, match),
    eval: false
  },
  {
    member: "gmaps",
    regex: /onde\s+(?:fica|está|é|eh)\s*(?:o|a)?\s+([^?]+)\??$/i,
    fn: (bot, msg, match) => services.gmaps.execute(bot, msg, match),
    eval: false
  },
  {
    member: "mdn",
    regex: /^js\s+([a-zA-Z])+/i,
    fn: (bot, msg, match) => services.mdn.execute(bot, msg, match),
    eval: false
  },
  {
    member: "npm",
    regex: /^npm\s+([a-zA-Z])+/i,
    fn: (bot, msg, match) => services.npm.execute(bot, msg, match),
    eval: false
  },
  {
    member: "wikipedia",
    regex: /^(Quem|O que|O q|oq) (é|eh|eah|e|significa|são|sao|foi|foram) ([^?]*)\s?\??/i,
    fn: (bot, msg, match) => services.qualeagiria.execute(bot, msg, {
      query: match[3]
    }),
    eval: false
  } /*,
  {
    member: "math",
    regex: /^(?!http)(Math\.)|^(?!http)\(?-?[.0-9]+(\s*[-+\/*]\s*-?[0-9Math]+)+(\)|\b|)/i,
    fn: (bot, msg, match) => services.math.execute(bot, msg),
    eval: false
}*/,
  {
    member: "maconha",
    regex: /\b(?:(420)|maconha|weed|marijuana|erva|bagulho|manhuca)\b/i,
    fn: (bot, msg, match) => services.maconha.execute(bot, msg),
    eval: false
  },
  {
    member: "risada",
    regex: /lol|kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+|h+u+a+s+|j+e+j+e+|h+u+a+h+u+a|h+u+e+h+u+e/i,
    fn: (bot, msg, match) => services.risada.execute(bot, msg),
    eval: false
  },
  {
    member: "saudacao",
    regex: /b(oa|om) (dia|tarde|noite)/i,
    fn: (bot, msg, match) => services.saudacao.execute(bot, msg, match),
    eval: false
  },
  {
    member: "tuamae",
    regex: /bot.*(burro|idiota|retardado|trou?xa|maconheiro|inútil|fiduma(e|é)gua|z(e|é) r(u|o)ela|ot(á|a)rio|v(i|e)ado)/i,
    fn: (bot, msg, match) => services.tuamae.execute(bot, msg, match),
    eval: false
  },
  {
    member: "lmgtfy",
    regex: /^gme\s+([a-zA-Z ])+/i,
    fn: (bot, msg, match) => services.gme.execute(bot, msg, match),
    eval: false
  },
  {
    member: "sticker-happy",
    regex: /(:D|😁)/,
    fn: (bot, msg) => services.stickerHappy.execute(bot, msg, match),
    eval: false
  },
  {
    member: "sticker-heart",
    regex: /❤️|<3|S2(?:[^\d]+|$)/i,
    fn: (bot, msg) => services.stickerHeart.execute(bot, msg, match),
    eval: false
  },
  {
    member: "sticker-webschool",
    regex: /webschool/i,
    fn: (bot, msg, match) => services.stickerWebschool.execute(bot, msg, match),
    eval: false
  },
  {
    member: "sticker-bemean",
    regex: /bemean|be\s*mean/i,
    fn: (bot, msg, match) => services.stickerBemean.execute(bot, msg),
    eval: false
  },
  {
    member: "omdb",
    regex: /bot, (?:v?o?c?[e|ê]?)? *(?:j[a|á])? *(?:viu|assist[iu|e]|gost[a|ou]|conhece) *(?:de )? *([^?]+)/i,
    fn: (bot, msg, match) => services.omdb.execute(bot, msg, match),
    eval: false
  },
  {
    member: "config",
    regex: /#config +([^ ]+) *([^ ]+)*/i,
    fn: (bot, msg, match) => services.config.execute(bot, msg, match),
    eval: false
  },
  {
    member: "zoeiro",
    regex: /(?:bot.*(z(?:o|u)ei?ro|engra(?:ç|c|z)ado|doido|lou?(?:k|c)o))|z(?:o|u)ei?ra/i,
    fn: (bot, msg, match) => services.zoeiro.execute(bot, msg),
    eval: false
  }
];

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
  evalReduce,
  evalTest,
  stickerHeart,
  stickerHappy,
  stickerWebschool,
  stickerBemean,
  omdb,
  whereami,
  config,
  zoeiro,
  qualeagiria,
  defs
};
