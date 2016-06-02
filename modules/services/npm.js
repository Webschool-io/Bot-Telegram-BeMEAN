'use strict';

const url = require('url');
const https = require('https');
const cheerioAdv = require('cheerio-advanced-selectors');
const cheerio = cheerioAdv.wrap(require('cheerio'));
const parse = {'parse_mode': 'HTML'};
const execute = (bot, msg) => {
  const arr = msg.text.split('npm ');
  const _base = 'https://www.npmjs.com/package/';
  const _url = url.parse(_base + encodeURIComponent(arr[1]));
  _url.headers = {
    'User-Agent': 'Telegram Bot',
    'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  };
  console.log('_url', _url);
  const req = https.request(_url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', (err) => {
      try {
        const $ = cheerio.load(data);
        //noinspection JSJQueryEfficiency
        const answers = {
          quickDef: $('.package-description').text(),
          longDef: $('#readme .deep-link').text().substr(0, 300)
        };
        const _return = 'Segundo o npm : "<i>' + answers.quickDef.replace(/\[[^]]*]/, "") + '</i>". fonte: ' + _url.href;
        bot.sendMessage(msg.chat.id, _return, parse);
        // const __return = 'Segundo o npm long: "<i>' + answers.longDef.replace(/\[[^]]*\]/, "") + '</i>". fonte: ' + _url;
        // bot.sendMessage(msg.chat.id, __return, parse);
      }
      catch (e) {
        bot.sendMessage(msg.chat.id, "DEU MERDA: " + e);
        console.log("Erro end: " + err)
      }
    });
  });
  req.end();
  req.on('error', (e) => console.error(e));
};
module.exports = {
  execute: execute
};