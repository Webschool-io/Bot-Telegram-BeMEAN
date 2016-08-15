'use strict';

const s = require('../settings');

const url = require('url');
const http = require('http');
const parse = { 'parse_mode': 'HTML' };
const stickers = [
  'BQADBAADMgEAAl6A9AWiXNcdh4N2fgI',
  'BQADBAADzQADXoD0BfaPN-SRlpBYAg',
  'BQADBAADxQADXoD0Be6MWaqIBanrAg',
  'BQADBAADAQEAAl6A9AVrEFjvEfTbRwI',
  'BQADBAADOQEAAl6A9AWLW7oQoiHXdAI',
  'BQADBAADBwEAAl6A9AXuD8xAc5avLwI',
  'BQADBAADxwADXoD0BaTJK9_y3lrtAg',
  'BQADBAADyQADXoD0BYyFKrC9hFpcAg',
  'BQADBAADywADXoD0BaJ-5YWTuZxTAg',
  'BQADBAADzwADXoD0BactihrL_9LKAg',
  'BQADBAAD6wADXoD0Bbi4Fg2kp0fUAg'
];
const execute = (bot, msg, match) => {
  const query = match.query;
  const _base = 'http://api.duckduckgo.com/?format=json&q=';
  const _url = url.parse(_base + encodeURIComponent(query));
  _url.headers = {
    'User-Agent': 'Telegram Bot',
    'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  };
  const req = http.request(_url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', (err) => {
      try {
        data = JSON.parse(data);
        /**
         * @param data.AbstractText
         * @param data.AbstractURL
         */
        if (data.AbstractText !== "") {
          const _return = "Segundo o DuckDuckGo: <i>" + data.AbstractText + "</i> Saiba mais em " + data.AbstractURL;
          bot.sendMessage(msg.chat.id, _return, parse);
          // bot.sendMessage(msg.chat.id, 'Data: "'+JSON.stringify(data)+'"');
          console.log("data): " + data);
        }
        else {
          const sticker = stickers[Math.floor(Math.random() * stickers.length)];
          const _return = "<b>Não achei nada jovem!</b> Sorry mesmo, mas você pode fumar um pra relaxar.";
          bot.sendMessage(msg.chat.id, _return, parse);
          s.get(msg.chat.id, 'stickers', (err, data) => {
            if (data == 'true') bot.sendSticker(msg.chat.id, sticker);
          });
        }
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