'use strict';

const adminIds = [
  16715013,
  77586615
];

const notifyAdmins = (bot, txt) => {
  adminIds.forEach((id) => {
    bot.sendMessage(id, txt, {parse_mode: 'Markdown'});
  });
};

const notifyBlacklistedEval = (msg, bot) => {
  const userinfo = msg.from.first_name + ' ' + msg.from.last_name + ' | @' + msg.from.username + ' | ' + msg.from.last_name;
  const evalInfo = '`' + msg.text + '`';
  notifyAdmins(bot, "Eval malicioso recebido: " + evalInfo + "\nEnviado por: " + userinfo);
};

module.exports = {
  notifyAdmins,
  adminIds,
  notifyBlacklistedEval
};
