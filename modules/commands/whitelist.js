'use strict';

const userutils = require('../utils/userutils');
const monitutils = require('../utils/monitutils');

const execute = (msg, match, bot) => {
    bot.sendMessage(msg.chat.id, JSON.stringify(msg.reply_to_message.from));
    /*if (monitutils.isAdmin(msg.from.id)) {
        userutils.whiteListUser(msg.from.id, (err, data) => {
            if (err) bot.sendMessage(msg.chat.id, "Erro: `" + JSON.stringify(err) + "`", { parse_mode: 'Markdown' })
            else {
                bot.sendMessage("Ok, usuário liberado.");
            }
        });
    } else {
        bot.sendMessage(msg.chat.id, "Cê não tem moral pra isso, não, jovem. Fala com o @rmunhoz ou @osuissa!");
    }*/
};

module.exports = {
    'execute': execute,
    'numParams': 1
};