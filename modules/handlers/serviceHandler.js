'use strict';

const modules = require('../');

const security = modules.security;
const services = modules.services;
const _services = services.map;
const s = modules.settings;
const monitutils = modules.utils.monit;
const userutils = modules.utils.user;
const treta = modules.db.treta;

const blacklist = (bot, msg, service) => {
  monitutils.notifyBlacklistedEval(msg, bot, service.member);
  userutils.isUserBlacklisted(msg.from.id, (err, status) => {
    if (!status) {
      userutils.blacklistUser(msg.from.id, 'Eval malicioso: `' + msg.text + '`', (err) => {
        if (!err) bot.sendMessage(msg.chat.id, "Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não! Aliás, nenhum comando que venha de você será executado mais. Adeus.", {reply_to_message_id: msg.id});
        else {
          bot.sendMessage(msg.chat.id, "Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não!", {reply_to_message_id: msg.id});
          monitutils.notifySharedAccount(bot, "Erro ao adicionar o user " + msg.from.id + " à blacklist. err: `" + JSON.stringify(err) + '`');
        }
      });
    } else {
      bot.sendMessage(msg.chat.id, "Não executo mais comandos vindos de você não, jovem", {reply_to_message_id: msg.id});
    }
  });
};

const _learn = (msg, bot) => {
  let hasLink = false;
  if (msg.entities) {
    msg.entities.forEach((el) => {
      if (el.type == 'url' || el.type == 'text_link') {
        hasLink = true;
      }
    });
  }
  if (!hasLink) {
    treta.insert({message: msg.text, group: msg.chat.id}, (err) => {
      if (err) monitutils.notifyAdmins(bot, `Erro ao salvar a mensagem no banco: ${JSON.stringify(err)}`);
    });
  }
};

const learn = (bot, msg) => {
  s.getGlobal('learn_global', (err, data) => {
    if (data == 'true') {
      s.get(msg.chat.id, 'learn_local', () => {
        _learn(msg, bot);
      });
    }
  });
};

const handle = (bot, msg, match) => {
  s.get(msg.chat.id, 'services', (err, data) => {
    if (data == 'true' || msg.text.match(/.*config.*/)) {
      if (Array.isArray(match)) {
        let recognized = false;
        _services.forEach((element) => {
          if (element.regex.test(msg.text)) {
            recognized = true;
            var _match = msg.text.match(element.regex);
            const service = element;
            security.isSecure(msg, service.eval, (secure) => {
              if (secure) {
                service.fn(bot, msg, _match);
              } else {
                blacklist(bot, msg, service);
              }
            });
          }
        });
        if (!recognized && msg.chat.type == 'private') {
          services.masem.execute(bot, msg);
        } else if (!recognized && (msg.chat.type == 'group' || msg.chat.type == 'supergroup') && msg.text) {
          learn(bot, msg);
        }
      }
    }
  });
};

module.exports = {
  handle
};