'use strict';

const url = require('url');
const http = require('http');
const pm = { 'parse_mode': 'Markdown' };

const execute = (bot, msg, match) => {
  const query = match.query;
  console.log('match.query', match.query)
  bot.sendMessage(msg.chat.id, "Procurando no Duckduckgo: " + query);
  const _base = 'http://api.duckduckgo.com/?format=json&q=';
  const _url = url.parse(_base + encodeURIComponent(query))
  _url.headers = {
    'User-Agent': 'Telegram Bot',
    'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  }
  const req = http.request(_url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', (err) => {
      try {
        data = JSON.parse(data);
        bot.sendMessage(msg.chat.id, "Segundo o DuckDuckGo: _"+data.AbstractText+"_ Saiba mais em "+data.AbstractURL, pm);
        console.log("data): " + data);
      } catch (e) {
        bot.sendMessage(msg.chat.id, "DEU MERDA: "+e, pm);
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