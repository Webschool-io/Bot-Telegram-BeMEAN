'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Criação do Schema
const jsonSchema = {
  user_id: Number,
  blacklisted: {
    status: Boolean,
    reason: String
  }
};

const userSchema = new Schema(jsonSchema);

userSchema.virtual('blisted').get(function () {
  return this.blacklisted.status;
});

const User = mongoose.model('User', userSchema, 'users');

const callback = (err, data) => {
  if (err) console.log('Erro no banco: ', err);
  else console.log('Retorno do banco: ', data.result || data);
};

const Controller = {
  insert: (d, cbk) => {
    cbk = cbk || callback;
    const model = new User(d);
    model.save(cbk);
  },
  select: (q, cbk) => {
    cbk = cbk || callback;
    User.find(q, cbk);
  },
  delete: (q, cbk) => {
    cbk = cbk || callback;
    User.remove(q, cbk);
  }
};

module.exports = Controller;