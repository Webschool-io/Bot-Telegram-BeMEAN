'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
  id: Number
  , text: String
  , timeReceived: Date
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
    const model = new Message({
      id: msg.id
      , text: msg.text
      , timeReceived: new Date()
    });
    model.save((err, result) => {
      if (!err) console.log(`[LOG] ${msg.text}`);
      else console.err(`[ERROR] Erro ao salvar mensagem ${msg.text}: ${err}`);
    });
  }
};

module.exports = Controller;