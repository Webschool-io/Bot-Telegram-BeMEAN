'use strict';

const execute = (msg, match, bot) => {
  if (match[2]) {
    try {
      const opts = match[2].match(/"(.*)" (.*)/);
      const message = opts[1];
      const ids = opts[2].split(" ");
      if (message && ids.length > 0) {
        ids.forEach((el) => {
          bot.sendMessage(el, message, { parse_mode: 'Markdown' })
            .then(() => {
              bot.sendMessage(msg.chat.id, `Mensagem enviada para ${el}`);
            })
            .catch((e) => {
              bot.sendMessage(msg.chat.id, `Erro ao enviar mensagem para o ID ${el}: \`${JSON.stringify(e)}\``, { parse_mode: 'Markdown' });
            });
        });
      } else {
        throw "Formato incorreto";
      }
    } catch (ignored) {
      bot.sendMessage(msg.chat.id, "Uso: `/say \"mensagem\" IDs separados por expaço`", { parse_mode: 'Markdown' });
    }
  } else {
    bot.sendMessage(msg.chat.id, "Uso: `/say \"mensagem\" IDs separados por expaço`", { parse_mode: 'Markdown' });
  }
}

module.exports = {
  execute,
  numParams: 1
}