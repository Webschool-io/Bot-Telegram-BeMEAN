'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
  chat_id: Number,
  key: String
};

const idSchema = new Schema(jsonSchema);

const Id = mongoose.model('Id', idSchema, 'ids');

const callback = (err, data) => {
  if (err) console.log('Erro no banco: ', err);
  else console.log('Retorno do banco: ', data.result || data);
};

const Controller = {
  insert: (d, cbk) => {
    cbk = cbk || callback;
    const model = new Id(d);
    model.save(cbk);
  },
  select: (q, cbk) => {
    cbk = cbk || callback;
    Id.find(q, cbk);
  },
  delete: (q, cbk) => {
    cbk = cbk || callback;
    Id.remove(q, cbk);
  }
};

module.exports = Controller;