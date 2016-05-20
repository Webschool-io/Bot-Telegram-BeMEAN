'use strict';

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');
const services = require('./modules/services');

// Matches commands
bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?/, (msg, match) => {
  let command = match[1];
  let args = match[2];
  if (command) {
    if (command in commands) {
      command = commands[command];
      if (match.length > command.numParams) {
        if (args) {
          args = args.split(' ');
        }
        command.execute(msg, match, bot);
      } else {
        bot.sendMessage(msg.chat.id, "Ops, número incorreto de parâmetros fornecidos (" + match.length + "). Número de parâmetros exigidos: " + command.numParams + " :/");
      }
    } else {
      bot.sendMessage(msg.chat.id, "Eita, esse comando não existe :/");
    }
  }
});

bot.onText(/onde\s+(fica|está|é|eh)\s*(o|a)?\s+(.+)$/i, (msg, match) => {
   bot.sendMessage(msg.chat.id, "Entrei certo")
  // Acessa a API do Google Maps que converte endereços em latitude e longitude.
  // const findPlace = (query, callback=(->)) => {
  //   query = query.replace(/["'!?]/g, '');
  //   var url = parseURL('https://maps.googleapis.com/maps/api/geocode/json?' +
  //                  'sensor=false&address=' + encodeURIComponent(query))
  //   url.headers = {
  //     'User-Agent': 'Mozilla like'
  //     'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  //   }
  //   req = https.request(url, (res) =>
  //     let data = '';
  //     res.on('data', (chunk) => data += chunk);
  //     res.on('end', =>
  //       try{
  //         data = JSON.parse(data);
  //         bot.sendMessage(msg.chat.id, "data: " + data)
  //       }
  //       catch(err){
  //         bot.sendMessage(msg.chat.id, "Erro end: " + err)
  //       }
  //       // if(data.results ? [0] ?.geometry?.location?.lat?
  //       //   callback null, data.results[0].geometry.location
  //       // else
  //         // err = new Error "Cant find location for #{query}. Status: #{data.status}"
  //         // err.status = data.status
  //         // callback err
  //   )
  //   req.on('error', (err) => bot.sendMessage(msg.chat.id, "Erro errorrrr: " + err));
  //   // do req.end
  // }

});

// Wikipedia
bot.onText(/(Quem|O que|O q|oq|Cadê|Cade) (é|eh|eah|e) ([^?]*)\??/i, (msg, match) => {
  services.wikipedia.execute(bot, msg, { 'wh': match[1], 'query': match[3] });
});

// calcular
bot.onText(/(Math\.)|\(?-?[.0-9]+(\s*[-+\/*]\s*-?[0-9Math]+)+(\)|\b|)/i, (msg, match) => {
  services.math.execute(bot, msg);
});

bot.onText(/machonha|weeb|marijuana|erva/i, (mgs, match) => {
  services.maconha.execute(bot, msg);
});

// risada
bot.onText(/kkkk|huehue|h+a+h+a+|h+e+h+e+|h+i+h+i+/i, (msg, match) => {
  services.risada.execute(bot, msg);
});
