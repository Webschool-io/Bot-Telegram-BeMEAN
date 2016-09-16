'use strict';

const modules = require('../');
const userutils = modules.utils.user;
const monitutils = modules.utils.monit;

module.exports = {
  handle: (bot, msg) => {
    if (msg.chat.type == 'private') {
      userutils.saveUser({user_id: msg.from.id, blacklisted: {status: false}}, (err) => {
        if (err) monitutils.notifyAdmins(bot, "Erro ao salvar o user " + msg.from.id + " no banco. err: `" + JSON.stringify(err) + '`');
      });
    }
  }
};