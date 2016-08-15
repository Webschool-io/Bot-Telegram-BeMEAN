const s = require('./db').setting;

const configs = {
    stickers: false
};

const callback = (err, data) => {
    if (err) console.log('Erro no banco: ', err);
    else console.log('Retorno do banco: ', data.result || data);
}

const set = (chat_id, key, value, cbk) => {
    cbk = cbk || callback;
    s.select({
        chat_id,
        key
    }, (err, data) => {
        if (data.length > 0) {
            let curSet = data[0];
            curSet.value = value;
            curSet.save(cbk);
        } else {
            s.insert({
                chat_id,
                key,
                value
            }, (err, data) => {
                cbk(err, data);
            })
        }
    })
};

const get = (chat_id, key, cbk) => {
    cbk = cbk || callback;
    s.select({
        chat_id,
        key
    }, (err, data) => {
        if (err) cbk(err, false);
        else {
            if (data.length > 0 && data[0].value) {
                cbk(false, data[0].value);
            } else {
                if (key in configs) {
                    cbk(false, configs[key]);
                } else {
                    cbk({ msg: 'Config desconhecida: ' + key });
                }
            }
        }
    })
};

const clear = (chat_id, key, cbk) => {
    cbk = cbk || callback;
    let q = {
        chat_id
    }
    if (key) q.key = key;

    s.delete(q, cbk);
};

module.exports = {
    get,
    set,
    clear,
    configs
}