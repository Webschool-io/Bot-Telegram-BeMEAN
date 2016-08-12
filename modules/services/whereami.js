const GoogleMapsAPI = require('googlemaps');
const config = {
  key: 'AIzaSyBnsCuuS0N0Akc1I3WEifbNoBCQ1iZ4a9g', //Não tente usar a chave, ela só aceita requests do meu server =)
  secure: true
}
const api = new GoogleMapsAPI(config);
const monitutils = require('../utils/monitutils');

const execute = (bot, msg) => {
    let reverseParams = {
        'latlng': msg.location.latitude + ',' + msg.location.longitude,
        'language': 'pt-BR'
    };
    
    api.reverseGeocode(reverseParams, (err, result) => {
        bot.sendMessage(msg.chat.id, "Resultado: `" + JSON.stringify(result) + "`", {'parse_mode': 'markdown'});
    });
};

module.exports = {
    execute
};