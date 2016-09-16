'use strict';

module.exports = {
  handle: (bot, msg) => {
    require('./').service.whereami.execute(bot, msg);
  }
};