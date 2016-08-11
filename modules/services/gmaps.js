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
  monitutils.notifySharedAccount(bot, "Locale not found at gmaps service: " + query + "\nresult: " + encodeURIComponent(JSON.stringify(result)));
}

const execute = (bot, msg, match) => {
  // const query = msg.text.replace(/["'!?]/g, '');
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
      bot.sendMessage(msg.chat.id, errMsg);
      monitutils.notifySharedAccount(bot, "Erro no service do gmaps:\nQuery: `" + query + "`\nresult: `" + JSON.stringify(result) + "`");
      if (result.status == 'ZERO_RESULTS') localeNotFound(bot, msg, query, result);
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

  /*
  bot.sendLocation(msg.chat.id, 'query: ' + query);
  const _base = 'https://maps.googleapis.com/maps/api/geocode/json';
  var _url = url.parse(_base + '?sensor=false&address=' + encodeURIComponent(query));
  _url.headers = {
    'User-Agent': 'Mozilla like'
    , 'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  };
  var options = {
   hostname: '_base',
   port: 443,
   path: '?sensor=false&address=' + encodeURIComponent(query),
   method: 'GET'
   };
  var req = https.request(_url, (res) => {
    let data = '';
    let coords = {};
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        /**
         * @param coords.lat
         * @param coords.lng
         **/
  /*
 data = JSON.parse(data);
 bot.sendMessage(msg.chat.id, JSON.stringify(data), {
   'parse_mode': 'Markdown',
   'reply_to_message_id': msg.message_id
 });
 coords = data.count[0].geometry.location;
 console.log("coords: " + JSON.stringify(coords));
 bot.sendLocation(msg.chat.id, coords.lat, coords.lng);
}
catch (err) {
 console.log("Erro end: " + err)
}
});
});
req.end();
req.on('error', (e) => {
console.error(e);
});*/
};
module.exports = {
  execute: execute
};