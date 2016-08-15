const s = require('../settings');
const mu = require('../utils/monitutils');

const configNotFound = (bot, msg) => {
    bot.sendMessage(msg.chat.id, 'Acho que você não entendeu o esquema. A sintaxe correta é: `config [nome da config] (valor|clear)`\nConfigs disponíveis e seus valores padrão: `' + JSON.stringify(s.configs) + '`', { 'parse_mode': 'Markdown' });
}

const sendError = (bot, msg, err, data) => {
    bot.sendMessage(msg.chat.id, "Erro ao redefinir a config");
    mu.notifySharedAccount(bot, 'Erro no módulo config: `' + JSON.stringify(err || data) + '`');
}

const execute = (bot, msg, match) => {
    if (match[2]) {
        if (match[2] == 'clear') {
            if (match[1] in s.configs) {
                s.clear(msg.chat.id, match[1], (err, data) => {
                    if (data.result.ok && !err) {
                        bot.sendMessage(msg.chat.id, "Config redefinida");
                    } else {
                        sendError(bot, msg, err, data);
                    }
                });
            } else {
                configNotFound(bot, msg);
            }
        } else {
            if (match[1] in s.configs) {
                s.set(msg.chat.id, match[1], match[2], (err, data) => {
                    if (err) {
                        sendError(bot, msg, err, data);
                    } else {
                        if (data.key = match[1]) {
                            bot.sendMessage(msg.chat.id, "Config salva");
                        }
                    }
                });
            } else {
                configNotFound(bot, msg);
            }
        }
    } else {
        if (match[1] == 'clear') {
            s.clear(msg.chat.id, false, (err, data) => {
                if (data.result.ok) {
                    bot.sendMessage(msg.chat.id, "Configurações redefinidas");
                } else {
                    sendError(bot, msg, err, data);
                }
            });
        } else if (match[1] in s.configs) {
            s.get(msg.chat.id, match[1], (err, data) => {
                if (err) {
                    sendError(bot, msg, err, data);
                } else {
                    bot.sendMessage(msg.chat.id, "Valor da config `" + key + "`: `" + data + "`")
                }
            });
        } else {
            configNotFound(bot, msg);
        }
    }
};

module.exports = {
    execute
}