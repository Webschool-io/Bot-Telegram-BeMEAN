const _load = match => {
  s.get(msg.chat.id, 'services', (err, data) => {
    if (data == 'true' || msg.text.match(/.*config.*/)) {
      if (Array.isArray(match)) {
        let recognized = false
        _services.forEach((element, index) => {
          if (_services[index].regex.test(msg.text)) {
            recognized = true
            var _match = msg.text.match(_services[index].regex)
            const service = _services[index]
            security.isSecure(msg, service.eval, secure => {
              if (secure) {
                service.fn(bot, msg, _match)
              } else {
                monitutils.notifyBlacklistedEval(msg, bot, service.member)
                userutils.isUserBlacklisted(msg.from.id, (err, status) => {
                  if (!status) {
                    userutils.blacklistUser(
                      msg.from.id,
                      'Eval malicioso: `' + msg.text + '`',
                      err => {
                        if (!err) {
                          bot
                            .sendMessage(
                              msg.chat.id,
                              'Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não! Aliás, nenhum comando que venha de você será executado mais. Adeus.',
                            {
                              reply_to_message_id: msg.id
                            }
                            )
                            .catch(console.log)
                        } else {
                          bot
                            .sendMessage(
                              msg.chat.id,
                              'Iiiiih, tá achando que sou troxa?! Não vou executar esse comando aí, não!',
                            {
                              reply_to_message_id: msg.id
                            }
                            )
                            .catch(console.log)
                          monitutils.notifySharedAccount(
                            bot,
                            'Erro ao adicionar o user ' +
                              msg.from.id +
                              ' à blacklist. err: `' +
                              JSON.stringify(err) +
                              '`'
                          )
                        }
                      }
                    )
                  } else {
                    bot
                      .sendMessage(
                        msg.chat.id,
                        'Não executo mais comandos vindos de você não, jovem',
                      {
                        reply_to_message_id: msg.id
                      }
                      )
                      .catch(console.log)
                  }
                })
              }
            })
          }
        })
        if (!recognized && msg.chat.type == 'private') {
          services.masem.execute(bot, msg)
        } else if (
          !recognized &&
          (msg.chat.type == 'group' || msg.chat.type == 'supergroup') &&
          msg.text
        ) {
          s.getGlobal('learn_global', (err, data) => {
            if (data == 'true') {
              s.get(msg.chat.id, 'learn_local', err => {
                let hasLink = false
                if (msg.entities) {
                  msg.entities.forEach(el => {
                    if (el.type == 'url' || el.type == 'text_link') {
                      hasLink = true
                    }
                  })
                }
                if (!hasLink) {
                  treta.insert(
                    {
                      message: msg.text,
                      group: msg.chat.id
                    },
                    err => {
                      if (err) {
                        monitutils.notifyAdmins(
                          bot,
                          `Erro ao salvar a mensagem no banco: ${JSON.stringify(
                            err
                          )}`
                        )
                      }
                    }
                  )
                }
              })
            }
          })
        }
      }
    }
  })
}

module.exports = _load
