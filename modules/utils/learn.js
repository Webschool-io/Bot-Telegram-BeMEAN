const s = require('../settings');
const treta = require("../db/treta");

const learn = (msg, bot) => {
    if ((msg.chat.type == "group" || msg.chat.type == "supergroup") && msg.text) {
        s.getGlobal("learn_global", (err, data) => {
            if (data == "true") {
                s.get(msg.chat.id, "learn_local", err => {
                    const hasLink =
                        msg.entities ?
                            msg.entities.filter(el => (el.type == 'url' || el.type == 'text_link')).length > 0
                            : false;
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
                                        `Erro ao salvar a mensagem no banco: ${JSON.stringify(err)}`
                                    );
                            }
                        );
                    }
                });
            }
        });
    }
};

module.exports = learn;