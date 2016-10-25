'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
  chat_id: Number
};

const groupSchema = new Schema(jsonSchema);

const Group = mongoose.model('Group', groupSchema, 'groups');

const callback = (err, data) => {
  if (err) console.log('Erro no banco: ', err);
  else console.log('Retorno do banco: ', data.result || data);
};

const Controller = {
  insert: (d, cbk) => {
    cbk = cbk || callback;
    const model = new Group(d);
    model.save(cbk);
  },
  select: (q, cbk) => {
    cbk = cbk || callback;
    Group.find(q, cbk);
  },
  delete: (q, cbk) => {
    cbk = cbk || callback;
    Group.remove(q, cbk);
  },
  getGroups: (cbk) => {
    cbk = cbk || callback;
    Group.aggregate([{
      $group: {
        _id: '$chat_id'
      }
    }], cbk);
  }
};

module.exports = Controller;