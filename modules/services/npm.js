'use strict';

const url = require('url');
const https = require('https');
const cheerioAdv = require('cheerio-advanced-selectors');
const cheerio = cheerioAdv.wrap(require('cheerio'));
const parse = { 'parse_mode': 'HTML' };
const execute = (bot, msg, match) => {
  const arr = msg.text.split('npm ');
  const _base = 'https://www.npmjs.com/package/';
  const _url = url.parse(_base + encodeURIComponent(_base[1]));
  console.log('arr', arr)
  console.log('_url', _url)
  _url.headers = {
    'User-Agent': 'Telegram Bot',
    'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  }
  const req = https.request(_url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', (err) => {
      try {
        const $ = cheerio.load(data);
        const _return = $('#readme').html()
        console.log("data _return: " + _return);
        bot.sendMessage(msg.chat.id, _return, parse);
      } catch (e) {
        bot.sendMessage(msg.chat.id, "DEU MERDA: "+e);
        console.log("Erro end: " + err)
      }
    });
  });
  req.end();
  req.on('error', (e) => console.error(e));
}
module.exports = {
    execute: execute
}