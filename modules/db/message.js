'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const pj = require('prettyjson');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
    id: Number
    , text: String
    , timeReceived: Date
    , msg: Schema.Types.ObjectId
};

const messageSchema = new Schema(jsonSchema);

messageSchema.virtual('blisted').get(function () {
    return this.blacklisted.status;
});

const Message = mongoose.model('Message', messageSchema, 'messages');

const callback = (err, data) => {
    if (err) console.log('Erro no banco: ', err);
    else console.log('Retorno do banco: ', data.result || data);
};

const Controller = {
    insert: (d, cbk) => {
        cbk = cbk || callback;
        const model = new Message(d);
        model.save(cbk);
    },
    select: (q, cbk) => {
        cbk = cbk || callback;
        Message.find(q, cbk);
    },
    delete: (q, cbk) => {
        cbk = cbk || callback;
        Message.remove(q, cbk);
    },
    log: msg => {
        let model;
        const timeReceived = new Date();

        model = new Message({
            id: msg.id
            , text: msg.text
            , timeReceived
            , msg: msg.text ? undefined : msg
        });

        model.save()
            .then(() => console.log(`[LOG][${moment(timeReceived).format('DD/MM/YY HH:mm:ss')}] ${msg.text || 'Mensagem sem texto'}`))
            .catch(err => {
                if (msg.text) console.error(`[ERROR] Erro ao salvar mensagem ${msg.text}: ${err}`)
            });
    }, error: msg => {
        const timeReceived = new Date();
        console.log(`[ERROR][${moment(timeReceived).format('DD/MM/YY HH:mm:ss')}] ${pj.render(msg)}`);
    }
};

module.exports = Controller;
