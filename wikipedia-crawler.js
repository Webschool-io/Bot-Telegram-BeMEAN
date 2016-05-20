'use strict';

const cheerio = require('cheerio');
const request = require('request');

request('https://pt.wikipedia.org/wiki/Hakim_Bey', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const teste = $('#bodyContent #mw-content-text p').text();
    console.log('teste', teste)
    // SO ENVIAR ESSE VALOR DE TESTE
  }
});