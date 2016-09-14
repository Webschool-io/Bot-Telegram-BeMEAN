'use strict';
const shared_account_id = 177865013;
const adminIds = [
  16715013,
  77586615,
  151646095
];

const notifyAdmins = (bot, txt) => {
  adminIds.forEach((id) => {
    bot.sendMessage(id, txt, { parse_mode: 'Markdown' });
  });
};

const notifySharedAccount = (bot, txt) => {
  bot.sendMessage(shared_account_id, txt, { parse_mode: 'Markdown' });
};

const notifyBlacklistedEval = (msg, bot, service) => {
  const userinfo = msg.from.first_name + ' ' + msg.from.last_name + ' | @' + msg.from.username;
  const evalInfo = '`' + msg.text + '`';
  notifyAdmins(bot, "Eval malicioso recebido: " + evalInfo + "\nEnviado por: " + userinfo + '\nService: ' + service);
};

const isAdmin = (userId) => {
  return adminIds.indexOf(userId) >= 0;
}

module.exports = {
  adminIds,
  notifyAdmins,
  notifyBlacklistedEval,
  notifySharedAccount,
  isAdmin
};
