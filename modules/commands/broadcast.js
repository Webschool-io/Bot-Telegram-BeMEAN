'use strict';

const treta = require('../db/treta');
const userutils = require('../utils/userutils');
const monitutils = require('../utils/monitutils');

const sendUse = (bot, msg) => {
    bot.sendMessage(msg.chat.id, "Uso: `/broadcast users|groups|all`", {
        parse_mode: 'Markdown'
    }).catch(console.log);
};

const execute = (msg, match, bot) => {
    if (monitutils.isAdmin(msg.from.id)) {
        if (match[2]) {
            let dest = match[2];
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
        bot.sendMessage(msg.chat.id, "Você não tem permissão pra usar esse comando :/").catch(console.log);
    }
};

const doBroadcast = (ids, bot, msg) => {
    if (Array.isArray(ids)) {
        if (msg.reply_to_message) {
            let tfw = msg.reply_to_message,
                sent = [];
            bot.sendMessage(msg.chat.id, `Enviando mensagem para: ${ids.length} conversas`).catch(console.log)
                .then(() => {
                    ids.forEach((id) => {
                        if (!sent.includes(id)) {
                            bot.forwardMessage(id, tfw.chat.id, tfw.message_id)
                                .catch(() => {
                                });
                        }
                        sent.push(id);
                    });
                    bot.sendMessage(msg.chat.id, "Broadcast finalizado").catch(console.log);
                });
        } else {
            bot.sendMessage(msg.chat.id, "Só funciona por reply, jovem!").catch(console.log);
        }
    } else {
        bot.sendMessage(msg.chat.id, "Erro interno").catch(console.log);
    }
};

const fillUsers = (cbk) => {
    userutils.getUsers((err, data) => {
        cbk(data.reduce((acc, el) => {
            if (el._id) acc.push(el._id);
            return acc;
        }, []));
    });
};

const fillGroups = (cbk, ids) => {
    treta.getGroups((err, data) => {
        cbk(data.reduce((acc, el) => {
            if (el._id) acc.push(el._id);
            return acc;
        }, []));
    });
};

module.exports = {
    execute,
    fillUsers
};