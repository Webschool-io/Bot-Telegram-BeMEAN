'use strict';

const db = require('./db');

module.exports = {
  security: require('./security'),
  commands: require('./commands'),
  services: require('./services'),
  settings: require('./settings'),
  utils: {
    monit: require('./utils/monitutils'),
    user: require('./utils/userutils'),
    regex: require('./utils/regexutils')
  },
  db
}
;