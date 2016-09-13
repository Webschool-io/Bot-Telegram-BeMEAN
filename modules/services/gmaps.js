'use strict';

const url = require('url');
const https = require('https');

const GoogleMapsAPI = require('googlemaps');
const config = {
  key: 'AIzaSyBnsCuuS0N0Akc1I3WEifbNoBCQ1iZ4a9g', //Não tente usar a chave, ela só aceita requests do meu server =)
  secure: true
}
const api = new GoogleMapsAPI(config);
const monitutils = require('../utils/monitutils');
const errMsg = "Droga, ocorreu um erro ao processar a solicitação :/";

const localeNotFound = (bot, msg, query, result) => {
  bot.sendMessage(msg.chat.id, "Então... Tem certeza que esse lugar existe? Pq procurei ele no Google Maps, e não achei, não :/");
}

const s = require('../settings');

const _execute = (bot, msg, match) => {
  // const query = msg.text.replace(/["'!?]/g, '');
  if (match[3]) {
    const query = match[3].replace(/["'!?]/g, '');
    let geocodeParams = {
      'address': query,
    }

    api.geocode(geocodeParams, (err, result) => {
      if (err) {
        bot.sendMessage(msg.chat.id, errMsg);
        monitutils.notifySharedAccount(bot, "Erro no service do gmaps:\nQuery: `" + query + "`\nerr: `" + JSON.stringify(err) + "`");
        return;
      }

      if (result.status != 'OK' || !result) {
        if (result.status == 'ZERO_RESULTS') {
          localeNotFound(bot, msg, query, result);
        } else {
          bot.sendMessage(msg.chat.id, errMsg);
        }
        return;
      }

      if (!result.results[0]) {
        localeNotFound(bot, msg, query, result);
        return;
      }

      if (result.results[0]) {
        let info = result.results[0];
        let name, lat, lng;

        name = info.formatted_address;
        lat = info.geometry.location.lat;
        lng = info.geometry.location.lng;

        bot.sendMessage(msg.chat.id, "Encontrei isso no Google Maps: " + name);
        bot.sendLocation(msg.chat.id, lat, lng);
      }
    });
  }
};

const execute = (bot, msg, match) => {
  s.get(msg.chat.id, 'location', (err, data) => {
    if (data == 'true') _execute(bot, msg, match);
  });
};

module.exports = {
  execute: execute
};