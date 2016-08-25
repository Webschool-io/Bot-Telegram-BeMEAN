'use strict';

const userutils = require('../utils/userutils');

const execute = (msg, match, bot) => {
    userutils.getUserCount((err, data) => {
        if (err) bot.sendMessage(msg.chat.id, "Erro ao obter a quantidade de usuários registrados: `" + JSON.stringify(err) + "`");
        else {
            let pessoa = data > 1 ? " pessoas" : " pessoa";
            bot.sendMessage(msg.chat.id, ("Atualmente, conheço " + data + pessoa + " =)"));
        };
    });
};

module.exports = {
    'execute': execute,
    'numParams': 0
};