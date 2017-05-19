const execute = (msg, match, bot) => {
  if(match[2] && match[2] != '') {
    bot.sendMessage(msg.chat.id, `Procurando CPF ${match[2]} no cadastro do SUS`).catch(console.log);
  }
}

export default {
  'execute': execute
  , 'numParams': 1
};
