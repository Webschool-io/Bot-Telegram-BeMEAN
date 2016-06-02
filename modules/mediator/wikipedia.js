'use strict';

const services = require('./modules/services');
module.exports = (bot, msg, parse = {}) => {
  return services.wikipedia.execute(bot, msg, parse);
};