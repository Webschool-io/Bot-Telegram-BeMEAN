'use strict';

module.exports = {
  handle: (bot, msg) => {
    if (msg.chat.type == 'private' && monitutils.isAdmin(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, msg.sticker.file_id, {'reply_to_message_id': msg.message_id});
    }
  }
};