const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, "pong").catch(console.log);

export default {
  'execute': execute,
  'numParams': 0
};