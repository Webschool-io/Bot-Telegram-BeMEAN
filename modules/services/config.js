'use strict';

const s = require('../settings');
const mu = require('../utils/monitutils');

const isValidValue = (config, value) => {
    return (config in s.configs && (s.configs[config].vals.filter((v) => { return value == v }).length > 0));
};

const getAvailableConfigs = () => {
    let result = '';
    for (c in s.configs) {
        if (!s.configs[c].adminOnly) {
            result += '*' + c + ':*\n';
            result += 'Valores:';
            s.configs[c].vals.forEach((v) => {
                result += ' `' + v + '`,';
            });
            result = result.slice(0, -1);
            result += '\nPadrão: `' + s.configs[c].default + '`\n\n';
        }
    }
    return result;
};

const configNotFound = (bot, msg) => {
    bot.sendMessage(msg.chat.id, 'Acho que você não entendeu o esquema. A sintaxe correta é: `config [nome da config] (valor|clear)`\n\nConfigs disponíveis:\n' + getAvailableConfigs(), { 'parse_mode': 'Markdown' });
}

const sendError = (bot, msg, err, data) => {
    bot.sendMessage(msg.chat.id, "Erro ao redefinir a config");
    mu.notifySharedAccount(bot, 'Erro no módulo config: `' + JSON.stringify(err || data) + '`');
}

const execute = (bot, msg, match) => {
    if (match[2]) {
        if (match[2] == 'clear') {
            if (match[1] in s.configs) {
                if (mu.isAdmin(msg.chat.id) || !s.configs[match[1]].adminOnly) {
                    if (s.configs[match[1]].global) {
                        s.clearGlobal(match[1], (err, data) => {
                            if (data.result.ok && !err) {
                                bot.sendMessage(msg.chat.id, "Config `" + match[1] + "` redefinida", { parse_mode: 'Markdown' });
                            } else {
                                sendError(bot, msg, err, data);
                            }
                        });
                    } else {
                        s.clear(msg.chat.id, match[1], (err, data) => {
                            if (data.result.ok && !err) {
                                bot.sendMessage(msg.chat.id, "Config `" + match[1] + "` redefinida", { parse_mode: 'Markdown' });
                            } else {
                                sendError(bot, msg, err, data);
                            }
                        });
                    }
                } else {
                    bot.sendMessage(msg.chat.id, `Você não tem permissão para redefinir a config \`${match[1]}\``, { parse_mode: 'Markdown' });
                }
            } else {
                configNotFound(bot, msg);
            }
        } else {
            if (match[1] in s.configs && isValidValue(match[1], match[2])) {
                if (mu.isAdmin(msg.from.id) || !s.configs[match[1]].adminOnly) {
                    if (s.configs[match[1]].global) {
                        s.setGlobal(match[1], match[2], (err, data) => {
                            if (err) {
                                sendError(bot, msg, err, data);
                            } else {
                                if (data.key == match[1]) {
                                    bot.sendMessage(msg.chat.id, `Config \`${match[1]}\` definida para \`${match[2]}\``, { parse_mode: 'Markdown' })
                                }
                            }
                        });
                    } else {
                        s.set(msg.chat.id, match[1], match[2], (err, data) => {
                            if (err) {
                                sendError(bot, msg, err, data);
                            } else {
                                if (data.key == match[1]) {
                                    bot.sendMessage(msg.chat.id, "Config `" + match[1] + "` definida para `" + match[2] + "`", { parse_mode: 'Markdown' });
                                }
                            }
                        });
                    }
                } else {
                    bot.sendMessage(msg.chat.id, `Você não tem permissão para definir a config \`${match[1]}\``, { parse_mode: 'Markdown' });
                }
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
            if (!s.configs[match[1]].global) {
                s.get(msg.chat.id, match[1], (err, data) => {
                    if (err) {
                        sendError(bot, msg, err, data);
                    } else {
                        bot.sendMessage(msg.chat.id, "Valor da config `" + match[1] + "`: `" + data + "`", { parse_mode: 'Markdown' })
                    }
                });
            } else {
                s.getGlobal(match[1], (err, data) => {
                    if (err) {
                        sendError(bot, msg, err, data);
                    } else {
                        bot.sendMessage(msg.chat.id, "Valor da config `" + match[1] + "`: `" + data + "`", { parse_mode: 'Markdown' })
                    }
                });
            }

        } else {
            configNotFound(bot, msg);
        }
    }
};

module.exports = {
    execute
}