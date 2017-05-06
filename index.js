"use strict";
if (process.env.envfile != "n") require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const commands = require("./modules/commands");
const services = require("./modules/services");
const serviceDefs = services.defs;
const security = require("./modules/security");
const monitutils = require("./modules/utils/monitutils");
const userutils = require("./modules/utils/userutils");
const message = require("./modules/db/message");
const fs = require("fs");
const learn = require('./modules/utils/learn');

const globalLock = process.env.lock;

const username = process.env.username || "@bemean_oficialbot";

const TELEGRAM_TOKEN = process.env.API_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true, onlyFirstMatch: true});

bot
    .getMe()
    .then(me => {
        takeOff();
        let info = [];
        const date = new Date();
        info.push("------------------------------");
        info.push("Bot successfully deployed!");
        info.push("------------------------------");
        info.push("Bot info:");
        info.push(`- ID: ${me.id}`);
        info.push(`- Name: ${me.first_name}`);
        info.push(`- Username: ${me.username}`);
        info.push("\n");
        info.push("Server info:");
        info.push(`- Node version: ${process.version}`);
        info.push("\n");
        info.push("Time Info:");
        info.push(
            `- Date: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        );
        info.push(
            `- Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );
        info.push("------------------------------");
        console.log(info.join("\n"));
    })
    .catch(console.log);

const takeOff = () => {
    bot.on("message", msg => {
        message.log(msg);
        if (msg.chat.type == "private") {
            userutils.saveUser(
                {
                    user_id: msg.from.id,
                    blacklisted: {status: false}
                },
                err => {
                    if (err)
                        monitutils.notifyAdmins(
                            bot,
                            `Erro ao salvar o user ${msg.from.id} no banco. err: \`${JSON.stringify(err)}\``
                        );
                }
            );
        }
    });

    // Matches commands
    bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?(@.*bot)?/i, (msg, match) => {
        if (!globalLock) {
            if (match[3] == username || !match[3]) {
                let command = match[1];
                if (command) {
                    if (command in commands) {
                        commands[command].execute(msg, match, bot);
                    } else {
                        if (match[3] || msg.chat.type == "private")
                            bot
                                .sendMessage(msg.chat.id, "Eita, esse comando não existe :/")
                                .catch(console.log);
                    }
                }
            }
        } else {
            console.log(
                `Confirming ${msg.text}`
            );
        }
    });

    // Configura os services
    for (const service of serviceDefs) {
        bot.onText(service.regex, (msg, match) => {
            security.isSecure(msg, service.eval, secure => {
                if (secure) {
                    service.fn(bot, msg, match);
                } else {
                    monitutils.notifyBlacklistedEval(msg, bot, service.member);
                    userutils.isUserBlacklisted(msg.from.id, (err, status) => {
                        if (!status) {
                            userutils.blacklistUser(msg.from.id, `Eval malicioso: \`${msg.text}\``, err => {
                                bot.sendMessage(
                                    msg.chat.id,
                                    'Mensagem potencialmente perigosa. Adicionando user à blacklist',
                                    {
                                        reply_to_message_id: msg.message_id
                                    }
                                );
                                if (err) {
                                    monitutils.notifySharedAccount(
                                        bot,
                                        `Erro ao adicionar o user ${msg.from.id} à blacklist. Err: ${JSON.stringify(err)}`
                                    )
                                }
                            });
                        } else {
                            bot.sendMessage(msg.chat.id, `Você está na blacklist. Não executo mais comandos seus`, {
                                reply_to_message_id: msg.message_id
                            })
                        }
                    });
                }
            });
        });
    }

    bot.onText(new RegExp(`.*${username}`), msg => {
        services.masem.execute(bot, msg);
        learn(msg, bot);
    });


    bot.on("sticker", msg => {
        if (msg.chat.type == "private" && monitutils.isAdmin(msg.chat.id)) {
            bot
                .sendMessage(msg.chat.id, msg.sticker.file_id, {
                    reply_to_message_id: msg.message_id
                })
                .catch(console.log);
        }
    });

    bot.on("location", msg => {
        services.whereami.execute(bot, msg);
    });

    bot.on("new_chat_participant", msg => {
        services.entrar.execute(bot, msg);
    });

    bot.on("left_chat_participant", msg => {
        services.sair.execute(bot, msg);
    });

};