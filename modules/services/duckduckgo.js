'use strict';

const url = require('url');
const http = require('http');
const parse = { 'parse_mode': 'HTML' };

const execute = (bot, msg, match) => {
  const query = match.query;
  console.log('match.query', match.query)
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
        if(data.DefinitionSource !== "") {
          const _return = "Segundo o DuckDuckGo: <i>"+data.AbstractText+"</i> Saiba mais em "+data.AbstractURL;
          bot.sendMessage(msg.chat.id, _return, parse);
          bot.sendMessage(msg.chat.id, 'Data: "'+JSON.stringify(data)+'"');
          console.log("data): " + data);
        }
        else bot.sendMessage(msg.chat.id, "Não achei manda jovem! Sorry mesmo.", parse);
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