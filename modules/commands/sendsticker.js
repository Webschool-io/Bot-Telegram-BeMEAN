const execute = (msg, match, bot) => {
  try {
    if (match[2] != "") {
      bot.sendSticker(msg.chat.id, match[2], {'reply_to_message_id': msg.message_id}).catch(console.log);
    } else {
      bot.sendMessage(msg.chat.id, "Você não me deu um ID, jovem ¬¬'", {'reply_to_message_id': msg.message_id}).catch(console.log);
    }
  }
  catch (Ex) {
    bot.sendMessage(msg.chat.id, `Erro ao enviar sticker: \`${ex}\``, {
      'parse_mode': 'Markdown',
      'reply_to_message_id': msg.message_id
    }).catch(console.log);
  }
};

export default {
  execute,
  'numParams': 1
};