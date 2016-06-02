'use strict';

const ids = [
  16715013,
  77586615
];

/**
 *
 * @param msg
 * @param msg.chat.id
 * @param msg.from.first_name
 * @param msg.message_id
 * @param match
 * @param bot
 */
const execute = (msg, match, bot) => {
  if (ids.indexOf(msg.chat.id) >= 0) {
    console.log('Log do ' + msg.from.first_name + ': ' + match[2]);
    bot.sendMessage(msg.chat.id, "Anotado =)", {'reply_to_message_id': msg.message_id});
  } else {
    bot.sendMessage(msg.chat.id, "Me obrigue :P", {'reply_to_message_id': msg.message_id});
  }
};

module.exports = {
  'execute': execute,
  'numParams': 1
};