const execute = (msg, match, bot) => {
  const _arr = msg.text.split('par ')[1];
  const arr = JSON.parse(_arr);
  const _return = arr.filter((acc) => !(acc % 2));
  bot.sendMessage(msg.chat.id, `Par(es): ${_return}`).catch(console.log);
};

export default {
  'execute': execute,
  'numParams': 0
};