const msgDefault = "Ajuda com o que, meu filho?!";

const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msgDefault).catch(console.log);

export default {
  'execute': execute,
  'numParams': 0
};