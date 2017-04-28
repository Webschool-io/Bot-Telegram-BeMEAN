const execute = (msg, match, bot) => {
    const text = 'Segundo o Qual é a Gíria\n*Uva*:\n`algo muito bom, excelente, ótimo.`\nFonte: http://www.qualeagiria.com.br'
    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Saiba como usar a gíria",
                url: 'http://www.qualeagiria.com.br/giria/uva/'
            }]]
        },
        parse_mode: 'Markdown'
    }).catch(console.log);
}

export default {
    execute,
    'numParams': 0
};