import userutils from '../utils/userutils';
import monitutils from '../utils/monitutils';

const execute = (msg, match, bot) => {
    let user_id = msg.reply_to_message.from.id;
    if (!user_id) bot.sendMessage(msg.chat.id, "Ué, quer liberar quem, fio?").catch(console.log);
    else {
        if (monitutils.isAdmin(msg.from.id)) {
            userutils.whiteListUser(user_id, (err, data) => {
                if (err) bot.sendMessage(msg.chat.id, `Erro: \`${JSON.stringify(err)}\``, { parse_mode: 'Markdown' }).catch(console.log)
                else {
                    bot.sendMessage(msg.chat.id, "Ok, usuário liberado.").catch(console.log);
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, "Cê não tem moral pra isso, não, jovem. Fala com o @rmunhoz ou @osuissa!").catch(console.log);
        }
    }
};

export default {
    'execute': execute,
    'numParams': 1
};