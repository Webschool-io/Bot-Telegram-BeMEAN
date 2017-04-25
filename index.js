"use strict";
if (process.env.envfile != "n") require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const commands = require("./modules/commands");
const services = require("./modules/services");
const _services = services.defs;
const security = require("./modules/security");
const monitutils = require("./modules/utils/monitutils");
const userutils = require("./modules/utils/userutils");
const treta = require("./modules/db/treta");
const message = require("./modules/db/message");
const s = require("./modules/settings");
const fs = require("fs");

const globalLock = process.env.lock;

const username = process.env.username || "@bemean_oficialbot";

const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;
const TELEGRAM_TOKEN = process.env.API_TOKEN;
const HOST = process.env.OPENSHIFT_NODEJS_IP || process.env.LOCAL_IP;
const DOMAIN = process.env.OPENSHIFT_APP_DNS || process.env.LOCAL_URL;

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

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
    info.push(`- Host: ${HOST}`);
    info.push(`- Port: ${PORT}`);
    info.push(`- Domain: ${DOMAIN}`);
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
  //Handling previous crash
  let crashdata;
  let processing;

  if (fs.existsSync("./.crash")) {
    let _data = JSON.parse(fs.readFileSync("./.crash"));
    if (_data.msg) {
      crashdata = _data;
      monitutils.notifySharedAccount(bot, "Reiniciando após crash");
      monitutils.notifyAdmins(bot, "Reiniciando após crash");
    }
    fs.unlinkSync("./.crash");
  } else {
    monitutils.notifySharedAccount(bot, "*Bot " + username + " reiniciado.*");
  }

  bot.on("message", msg => {
    message.log(msg);
    processing = msg;
    if (!crashdata || msg.id != crashdata.msg.id) {
      if (msg.chat.type == "private") {
        userutils.saveUser(
          {
            user_id: msg.from.id,
            blacklisted: {
              status: false
            }
          },
          err => {
            if (err)
              monitutils.notifyAdmins(
                bot,
                "Erro ao salvar o user " +
                  msg.from.id +
                  " no banco. err: `" +
                  JSON.stringify(err) +
                  "`"
              );
          }
        );
      }
    } else {
      monitutils.notifyAdmins(
        bot,
        `Ignorando mensagem ${msg.id} como ação de recuperação após crash`
      );
    }
  });

  // Matches commands
  bot.onText(/^\/([a-zA-Z]+) ?([^@]+)?(@.*bot)?/i, (msg, match) => {
    if (!globalLock) {
      processing = msg;
      if (!crashdata || msg != crashdata.msg) {
        if (match[3] && match[3] == username || !match[3]) {
          let command = match[1];
          if (command) {
            if (command in commands) {
              command = commands[command];
              let argsCount = match.length - 2;
              if (argsCount >= command.numParams) {
                command.execute(msg, match, bot);
              } else {
                bot
                  .sendMessage(
                    msg.chat.id,
                    "Ops, número incorreto de parâmetros fornecidos (" +
                      argsCount +
                      "). Número de parâmetros exigidos: " +
                      command.numParams +
                      " :/"
                  )
                  .catch(console.log);
              }
            } else {
              if (match[3] || msg.chat.type == "private")
                bot
                  .sendMessage(msg.chat.id, "Eita, esse comando não existe :/")
                  .catch(console.log);
            }
          }
        }
      }
    } else {
      console.log(`Confirming ${msg.text}`);
    }
  });

  bot.onText(/^([^\/]+)/i, (msg, match) => {
    if (!globalLock) {
      processing = msg;
      if (!crashdata || msg.id != crashdata.msg.id) {
        const _load = match => {
          s.get(msg.chat.id, "services", (err, data) => {
            if (data == "true" || msg.text.match(/.*config.*/)) {
              if (Array.isArray(match)) {
                let recognized = false;
                _services.forEach((element, index) => {
                  if (_services[index].regex.test(msg.text)) {
                    recognized = true;
                    var _match = msg.text.match(_services[index].regex);
                    const service = _services[index];
                    security.isSecure(msg, service.eval, secure => {
                      if (secure) {
                        service.fn(bot, msg, _match);
                      } else {
                        monitutils.notifyBlacklistedEval(
                          msg,
                          bot,
                          service.member
                        );
                        userutils.isUserBlacklisted(msg.from.id, (
                          err,
                          status
                        ) => {
                          if (!status) {
                            userutils.blacklistUser(
                              msg.from.id,
                              "Eval malicioso: `" + msg.text + "`",
                              err => {
                                if (!err)
                                  bot
                                    .sendMessage(
                                      msg.chat.id,
                                      "Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não! Aliás, nenhum comando que venha de você será executado mais. Adeus.",
                                      {
                                        reply_to_message_id: msg.id
                                      }
                                    )
                                    .catch(console.log);
                                else {
                                  bot
                                    .sendMessage(
                                      msg.chat.id,
                                      "Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não!",
                                      {
                                        reply_to_message_id: msg.id
                                      }
                                    )
                                    .catch(console.log);
                                  monitutils.notifySharedAccount(
                                    bot,
                                    "Erro ao adicionar o user " +
                                      msg.from.id +
                                      " à blacklist. err: `" +
                                      JSON.stringify(err) +
                                      "`"
                                  );
                                }
                              }
                            );
                          } else {
                            bot
                              .sendMessage(
                                msg.chat.id,
                                "Não executo mais comandos vindos de você não, jovem",
                                {
                                  reply_to_message_id: msg.id
                                }
                              )
                              .catch(console.log);
                          }
                        });
                      }
                    });
                  }
                });
                if (!recognized && msg.chat.type == "private") {
                  services.masem.execute(bot, msg);
                } else if (
                  !recognized &&
                  (msg.chat.type == "group" || msg.chat.type == "supergroup") &&
                  msg.text
                ) {
                  s.getGlobal("learn_global", (err, data) => {
                    if (data == "true") {
                      s.get(msg.chat.id, "learn_local", err => {
                        let hasLink = false;
                        if (msg.entities) {
                          msg.entities.forEach(el => {
                            if (el.type == "url" || el.type == "text_link") {
                              hasLink = true;
                            }
                          });
                        }
                        if (!hasLink) {
                          treta.insert(
                            {
                              message: msg.text,
                              group: msg.chat.id
                            },
                            err => {
                              if (err)
                                monitutils.notifyAdmins(
                                  bot,
                                  `Erro ao salvar a mensagem no banco: ${JSON.stringify(
                                    err
                                  )}`
                                );
                            }
                          );
                        }
                      });
                    }
                  });
                }
              }
            }
          });
        };

        _load(match);
      }
    } else {
      console.log(`Confirming ${msg.text}`);
    }
  });

  bot.on("sticker", msg => {
    processing = msg;
    if (!crashdata || msg != crashdata.msg) {
      let ids = require("./modules/utils/monitutils").adminIds;
      if (msg.chat.type == "private" && ids.indexOf(msg.chat.id) >= 0) {
        bot
          .sendMessage(msg.chat.id, msg.sticker.file_id, {
            reply_to_message_id: msg.message_id
          })
          .catch(console.log);
      }
    }
  });

  bot.on("location", msg => {
    processing = msg;
    if (!crashdata || msg != crashdata.msg) {
      services.whereami.execute(bot, msg);
    }
  });
};

  bot.on("new_chat_participant", msg => {
    processing = msg;
    if (!crashdata || msg != crashdata.msg) {
      _services.entrar.execute(bot, msg);
    }
  });
};

  bot.on("left_chat_participant", msg => {
    processing = msg;
    if (!crashdata || msg != crashdata.msg) {
      _services.sair.execute(bot, msg);
    }
  });
};

const saveCrash = err => {
  message.error(err);
  fs.writeFileSync(
    "./.crash",
    JSON.stringify({
      err: err.toString(),
      msg: processing,
      time: new Date()
    })
  );
  monitutils.notifyAdmins(
    bot,
    `Erro ao processar: \`\`\`${JSON.stringify(
      processing
    )}\`\`\`\nErro: \`\`\`${err}\`\`\` `
  );
  process.exit(1);
};

process.on("uncaughtException", saveCrash);
