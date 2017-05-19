import evalDate from "./services/eval-date";
import evalFilter from "./services/eval-filter";
import evalMap from "./services/eval-map";
import evalReduce from "./services/eval-reduce";
import evalTest from "./services/eval-test";
import wikipedia from "./services/wikipedia";
import maconha from "./services/maconha";
import risada from "./services/risada";
import gmaps from "./services/gmaps";
import mdn from "./services/mdn";
import md5 from "./services/md5";
import saudacao from "./services/saudacao";
import masem from "./services/masem";
import tuamae from "./services/tuamae";
import gme from "./services/gme";
import npm from "./services/npm";
import stickerHeart from "./services/sticker-heart";
import stickerHappy from "./services/sticker-happy";
import stickerWebschool from "./services/sticker-webschool";
import stickerBemean from "./services/sticker-bemean";
import omdb from "./services/omdb";
import whereami from "./services/whereami";
import config from "./services/config";
import zoeiro from "./services/zoeiro";
import entrar from "./services/entrar";
import sair from "./services/sair";
import qualeagiria from "./services/qualeagiria";

const services = {
  wikipedia,
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
  entrar,
  sair,
  qualeagiria
};

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
    fn: (bot, msg, match) => services.md5.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "gmaps",
    regex: /onde\s+(?:fica|está|é|eh)\s*(?:o|a)?\s+([^?]+)\??$/i,
    fn: (bot, msg, match) => services.gmaps.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "mdn",
    regex: /^js\s+([a-zA-Z])+/i,
    fn: (bot, msg, match) => services.mdn.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "npm",
    regex: /^npm\s+([a-zA-Z])+/i,
    fn: (bot, msg, match) => services.npm.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "wikipedia",
    regex: /^(Quem|O que|O q|oq) (é|eh|eah|e|significa|são|sao|foi|foram) ([^?]*)\s?\??/i,
    fn: (bot, msg, match) => services.qualeagiria.execute(bot, msg, {
      query: match[3]
    }),
    eval: false
  },
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
    fn: (bot, msg, match) => services.saudacao.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "tuamae",
    regex: /bot.*(burro|idiota|retardado|trou?xa|maconheiro|inútil|fiduma(e|é)gua|z(e|é) r(u|o)ela|ot(á|a)rio|v(i|e)ado)/i,
    fn: (bot, msg, match) => services.tuamae.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "lmgtfy",
    regex: /^gme\s+([a-zA-Z ])+/i,
    fn: (bot, msg, match) => services.gme.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "sticker-happy",
    regex: /(:D|😁)/,
    fn: (bot, msg) => services.stickerHappy.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "sticker-heart",
    regex: /❤️|<3|S2(?:[^\d]+|$)/i,
    fn: (bot, msg) => services.stickerHeart.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "sticker-webschool",
    regex: /webschool/i,
    fn: (bot, msg, match) => services.stickerWebschool.execute(bot, msg, match ? match : []),
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
    fn: (bot, msg, match) => services.omdb.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "config",
    regex: /#config +([^ ]+) *([^ ]+)*/i,
    fn: (bot, msg, match) => services.config.execute(bot, msg, match ? match : []),
    eval: false
  },
  {
    member: "zoeiro",
    regex: /(?:bot.*(z(?:o|u)ei?ro|engra(?:ç|c|z)ado|doido|lou?(?:k|c)o))|z(?:o|u)ei?ra/i,
    fn: (bot, msg, match) => services.zoeiro.execute(bot, msg),
    eval: false
  }
];

export default {
  wikipedia,
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
  entrar,
  sair,
  qualeagiria,
  defs
};
