'use strict';

const ids = require('../db').id;

const findId = (key, cbk) => {
  return new Promise((resolve, reject) => {
    ids.select({ key }, (err, response) => {
      if (!err) cbk ? cbk(null, response) : resolve(response);
      else cbk ? cbk(err, null) : reject(err);
    });
  });
}

const findKey = (id, cbk) => {
  return new Promise((resolve, reject) => {
    id.select({ chat_id: id }, (err, data) => {
      if (!err) cbk ? cbk(null, data) : resolve(data);
      else cbk ? cbk(err, null) : reject(err);
    });
  });
}

const add = (key, id, cbk) => {
  return new Promise((resolve, reject) => {
    ids.select({ chat_id: id }, (err, data) => {
      if (err) cbk ? cbk(err, null) : reject(err);
      if (data.length > 0) {
        cbk ? cbk(err, null) : reject("Este ID ja está salvo como " + data[0].key);
      } else {
        ids.insert({
          chat_id: id,
          key
        }, (err, data) => {
          if (err) cbk ? cbk(err, null) : reject(err);
          else cbk ? cbk(null, data) : resolve(data);
        })
      }
    });
  });
}

const remove = (key, cbk) => {
  return new Promise((resolve, reject) => {
    ids.delete({
      key
    }, (err, data) => {
      if (err) cbk ? cbk(err, null) : reject(err);
      else {
        cbk ? cbk(null, data) : resolve(data);
      }
    })
  });
}

module.exports = {
  add,
  remove,
  findId,
  findKey
}