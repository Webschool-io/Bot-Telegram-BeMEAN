'use strict';

const treta = require('../db/treta');
const userutils = require('../utils/userutils');
const monitutils = require('../utils/monitutils');

const sendUse = (bot, msg) => {
    bot.sendMessage(msg.chat.id, "Uso: `/broadcast users|groups|all`", {
        parse_mode: 'Markdown'
    });
}

const execute = (msg, match, bot) => {
    if (monitutils.isAdmin(msg.from.id)) {
        if (match[2]) {
            let dest = match[2];
            let ids = [];
            switch (dest) {
                case 'users':
                    fillUsers((ids) => {
                        doBroadcast(ids, bot, msg);
                    });
                    break;
                case 'groups':
                    fillGroups((ids) => {
                        doBroadcast(ids, bot, msg);
                    });
                    break;
                case 'all':
                    fillUsers((ids) => {
                        fillGroups((ids) => {
                            doBroadcast(ids, bot, msg);
                        }, ids)
                    });
                    break;
                default:
                    sendUse(bot, msg);
                    break;
            }
        } else {
            sendUse(bot, msg)
        }
    } else {
        bot.sendMessage(msg.chat.id, "Você não tem permissão pra usar esse comando :/");
    }
}

const doBroadcast = (ids, bot, msg) => {
    if (Array.isArray(ids)) {
        if (msg.reply_to_message) {
            let tfw = msg.reply_to_message,
                sent = [];
            bot.sendMessage(msg.chat.id, `Enviando mensagem para: ${ids.length} conversas`)
                .then(() => {
                    ids.forEach((id) => {
                        if (sent.indexOf(id) < 0) {
                            bot.forwardMessage(id, tfw.chat.id, tfw.message_id)
                                .catch(() => {})
                        }
                        sent.push(id);
                    });
                    bot.sendMessage(msg.chat.id, "Broadcast finalizado");
                });
        } else {
            bot.sendMessage(msg.chat.id, "Só funciona por reply, jovem!");
        }
    } else {
        bot.sendMessage(msg.chat.id, "Erro interno");
    }
}

const fillUsers = (cbk) => {
    userutils.getUsers((err, data) => {
        let users = [];
        data.forEach((el) => {
            if (el._id) users.push(el._id)
        });
        cbk(users);
    });
}

const fillGroups = (cbk, ids) => {
    treta.getGroups((err, data) => {
        ids = ids || [];
        data.forEach((el) => {
            if (el._id) ids.push(el._id);
        });
        cbk(ids);
    });
}

module.exports = {
    execute,
    numParams: 1,
    fillUsers
}