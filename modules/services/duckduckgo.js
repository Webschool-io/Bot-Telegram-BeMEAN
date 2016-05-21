'use strict';

const url = require('url');
const http = require('http');

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
        bot.sendMessage(msg.chat.id, "Retorno Duck: " + data.Heading);
        console.log("data.Heading): " + data.Heading);
      } catch (e) {
        bot.sendMessage(msg.chat.id, messages.communicationError.replace("%e%", e), pm);
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