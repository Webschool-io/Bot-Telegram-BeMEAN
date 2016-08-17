'use strict';

const request = require('request');
const API_URLS = {
  exact: "http://www.omdbapi.com/?plot=short&r=json&t=",
  search: "http://www.omdbapi.com/?plot=short&r=json&s=",
  with_id: "http://www.omdbapi.com/?plot=short&r=json&i="
};

const MESSAGES = {
  search_succes_nf: "Hm... Esse nome me lembra mais de um título. Clique no botão do título desejado para mais informações.",
  search_succes_f: "Escolha um título para obter os detalhes",
  search_fail_nf: "Vish, esse aí eu não conheço, não :/"
};

const IMDB_URL = 'http://www.imdb.com/title/';

const s = require('../settings');

const execute = (bot, msg, match, forceSearch, id) => {
  s.get(msg.chat.id, 'search', (err, data) => {
    if (data == 'true') _execute(bot, msg, match, forceSearch, id);
  })
}

const _execute = (bot, msg, match, forceSearch, id) => {
  //noinspection JSUnusedAssignment
  forceSearch = forceSearch || false;
  if (match[1] && match[1] != " " && match[1] != "") {
    _findInfo(bot, msg, match[1], id);
  } else {
    bot.sendMessage(msg.chat.id, "Como vou saber, se vc não me fala o nome, jovem?");
  }
};

const _findInfo = (bot, msg, title, forceSearch, id) => {
  forceSearch = forceSearch || false;
  const _runSearch = (bot, msg, title, force) => {
    request(API_URLS.search + encodeURIComponent(title), (err, res, content) => {
      if (!err) {
        let _info = JSON.parse(content);
        if (_info.Response != 'False') {
          let _return = {
            count: _info.totalResults,
            results: []
          };
          _info.Search.forEach((result) => {
            _return.results.push([{ text: result.Title, callback_data: { movie_id: result.imdbID } }]);
          });
          _respond(bot, msg, _return, force);
        } else {
          _respond(bot, msg, false);
        }
      } else {
        console.log("Erro: " + err);
        _respond(bot, msg, false);
      }
    });
  };

  if (!forceSearch) {
    request(id ? API_URLS.with_id + id : API_URLS.exact + encodeURIComponent(title), (err, res, content) => {
      if (!err) {
        let _info = JSON.parse(content);
        /**
         * @param _info
         * @param _info.totalResults
         * @param _info.Search
         * @param _info.Response
         * @param _info.Title
         * @param _info.Genre
         * @param _info.Type
         * @param _info.Released
         * @param _info.Plot
         * @param _info.Poster
         * @param _info.imdbID
         */
        if (_info.Response != 'False') {
          let _return = {
            count: 1,
            poster: _info.Poster,
            text: _info.Title + "\n\n" + "Gênero: " + _info.Genre + "\n" + "Tipo: " + _info.Type + "\n" + "Lançado em " + _info.Released + "\n" + "Sinopse: " + _info.Plot + "\n" + "Poster: " + _info.Poster,
            imdb_link: IMDB_URL + _info.imdbID
          };
          _respond(bot, msg, _return);
        } else {
          _runSearch(bot, msg, title, false);
        }
      } else {
        console.log("Erro: " + err);
        _respond(bot, msg, false);
      }
    });
  } else {
    _runSearch(bot, msg, title, true);
  }
};

const _respond = (bot, msg, info, force) => {
  force = force || false;
  if (info) {
    if (info.count == 1) {
      if (!force) bot.sendMessage(msg.chat.id, "Opa, esse eu conheço!");
      setTimeout(() => {
        bot.sendMessage(msg.chat.id, info.text, {
          reply_markup: {
            inline_keyboard: [[{
              text: "Mais informações",
              url: info.imdb_link
            }]]
          }
        });
      }, 1000);
    } else {
      bot.sendMessage(msg.chat.id, force ? MESSAGES.search_succes_f : MESSAGES.search_succes_nf, { reply_markup: { inline_keyboard: info.results } })
    }
  } else {
    bot.sendMessage(msg.chat.id, MESSAGES.search_fail_nf);
  }
};

module.exports = {
  execute,
  _findInfo
};