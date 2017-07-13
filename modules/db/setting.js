'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
// Criação do Schema
const jsonSchema = {
  chat_id: Number,
  key: String,
  value: String
}

const settingSchema = new Schema(jsonSchema)

const Setting = mongoose.model('Setting', settingSchema, 'settings')

const callback = (err, data) => {
  if (err) console.log('Erro no banco: ', err)
  else console.log('Retorno do banco: ', data.result || data)
}

const Controller = {
  insert: (d, cbk) => {
    cbk = cbk || callback
    const model = new Setting(d)
    model.save(cbk)
  },
  select: (q, cbk) => {
    cbk = cbk || callback
    Setting.find(q, cbk)
  },
  delete: (q, cbk) => {
    cbk = cbk || callback
    Setting.remove(q, cbk)
  }
}

module.exports = Controller
