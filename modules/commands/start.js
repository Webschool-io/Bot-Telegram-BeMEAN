var execute = function(msg, match, bot){
    bot.sendMessage(msg.chat.id, "Ops, nada por aqui ainda. Por favor, volte outro dia =)");
}
module.exports = {
    'execute': execute,
    'numParams': 0
}