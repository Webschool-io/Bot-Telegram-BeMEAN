const execute = (msg, match, bot) => bot.sendMessage(msg.chat.id, msg.text.replace('/echo ', '').catch(console.log), {
  'parse_mode': 'Markdown'
});

export default {
  'execute': execute,
  'numParams': 1
};