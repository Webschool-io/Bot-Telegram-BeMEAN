const ids = [
  16715013,
  77586615
];

const execute = (msg, match, bot) => {
  if (ids.includes(msg.chat.id)) {
    console.log(`Log do ${msg.from.first_name}: ${match[2]}`);
    bot.sendMessage(msg.chat.id, "Anotado =)", {'reply_to_message_id': msg.message_id}).catch(console.log);
  } else {
    bot.sendMessage(msg.chat.id, "Me obrigue :P", {'reply_to_message_id': msg.message_id}).catch(console.log);
  }
};

export default {
  'execute': execute,
  'numParams': 1
};