import mu from '../utils/monitutils';
const use = "Uso: `/say \"mensagem\" IDs separados por espaço`";

const execute = (msg, match, bot) => {
  if (!mu.isAdmin(msg.from.id)) {
    bot.sendMessage(msg.chat.id, "Você não tem privilégios para usar esse comando, jovem").catch(console.log);
    return null;
  }
  if (match[2]) {
    try {
      const opts = match[2].match(/"(.*)" (.*)/);
      const message = opts[1];
      const ids = opts[2].split(" ");
      if (message && ids.length > 0) {
        ids.forEach((el) => {
          bot.sendMessage(el, message, { parse_mode: 'Markdown' }).catch(console.log)
            .then(() => {
              bot.sendMessage(msg.chat.id, `Mensagem enviada para ${el}`).catch(console.log);
            })
            .catch((e) => {
              bot.sendMessage(msg.chat.id, `Erro ao enviar mensagem para o ID ${el}: \`${JSON.stringify(e)}\``, { parse_mode: 'Markdown' }).catch(console.log);
            });
        });
      } else {
        throw "Formato incorreto";
      }
    } catch (ignored) {
      bot.sendMessage(msg.chat.id, use, { parse_mode: 'Markdown' }).catch(console.log);
    }
  } else {
    bot.sendMessage(msg.chat.id, use, { parse_mode: 'Markdown' }).catch(console.log);
  }
}

export default {
  execute,
  numParams: 1
};