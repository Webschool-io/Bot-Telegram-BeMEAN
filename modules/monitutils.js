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

module.exports = {
  notifyAdmins
};
