'use strict';

const ids = [
    16715013,
    77586615
]

const execute = (msg, match, bot) => {
    if (ids.indexOf(msg.chat.id) >= 0) {
        console.log('Log do ' + msg.from.first_name + ': ' + msg.text);
        bot.sendMessage(msg.chat.id, "Anotado =)", { 'reply_to_message_id': msg.message_id });
    } else {
        bot.sendMessage(msg.chat.id, "Me obrigue :P", { 'reply_to_message_id': msg.message_id });
    }
}