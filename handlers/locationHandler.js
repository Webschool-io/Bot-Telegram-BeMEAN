'use strict';

module.exports = {
  handle: (bot, msg) => {
    require('./index').service.whereami.execute(bot, msg);
  }
};