'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
  message: String,
  category: String,
  group: String
};

const tretaSchema = new Schema(jsonSchema);

const Treta = mongoose.model('Treta', tretaSchema, 'tretas');

const callback = (err, data) => {
  if (err) console.log('Erro no banco: ', err);
  else console.log('Retorno do banco: ', data.result || data);
};

const Controller = {
  insert: (d, cbk) => {
    cbk = cbk || callback;
    const model = new Treta(d);
    model.save(cbk);
  },
  select: (q, cbk) => {
    cbk = cbk || callback;
    Treta.find(q, cbk);
  },
  delete: (q, cbk) => {
    cbk = cbk || callback;
    Treta.remove(q, cbk);
  }
};

module.exports = Controller;