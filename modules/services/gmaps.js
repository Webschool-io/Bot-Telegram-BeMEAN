'use strict';

const url = require('url');
const https = require('https');


const execute = (bot, msg) => {
  const query = "Curitiba".replace(/["'!?]/g, '');
  const _base = 'https://maps.googleapis.com/maps/api/geocode/json';
  var _url = url.parse(_base + '?sensor=false&address=' + encodeURIComponent(query))
  _url.headers = {
    'User-Agent': 'Mozilla like'
  , 'Accept-Language': 'pt-BR;q=1, pt;q=0.8, en;q=0.5'
  }
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
      try{
        data = JSON.parse(data);
        coords = data.results[0].geometry.location;
        console.log("coords: " + JSON.stringify(coords));
        bot.senLocation(msg.chat.id, coords.lat, coords.lng);
      }
      catch(err){
        console.log("Erro end: " + err)
      }
    });
  });
  req.end();

  req.on('error', (e) => {
    console.error(e);
  });

module.exports = {
    execute: execute
}