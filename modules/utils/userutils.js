'use strict';

const users = require('../db').user;
const monitutils = require('./monitutils');
const callback = (err, data) => {
    if (err) console.log('Erro no banco: ', err);
    else console.log('Retorno do banco: ', data.result || data);
};

const saveUser = (user, cbk) => {
    cbk = cbk || callback;
    users.select({ user_id: user.user_id }, (err, data) => {
        if (err) cbk(err, null)
        else if (data.length > 0) {
            let u = data[0];
            u.blacklisted = user.blacklisted;
            u.save(cbk);
        } else {
            users.insert(user, cbk);
        };
    });
};

const getUser = (userId, cbk) => {
    cbk = cbk || callback;
    users.select({ user_id: userId }, cbk);
};

const deleteUser = (userId, cbk) => {
    cbk = cbk || callback;
    users.delete({ user_id: userId }, cbk)
}

const isUserBlacklisted = (userId, cbk) => {
    cbk = cbk || callback;
    users.select({ user_id: userId }, (err, data) => {
        if (err) cbk(err, data);
        else if (data.length > 0) {
            cbk(null, data[0].blacklisted.status);
        } else {
            cbk(null, false);
        };
    });
};

const blacklistUser = (userId, reason, cbk) => {
    cbk = cbk || callback;
    users.select({ user_id: userId }, (err, data) => {
        if (err) cbk(err, null)
        else if (data.length > 0) {
            let u = data[0];
            u.blacklisted.status = true;
            u.blacklisted.reason = reason;
            u.save(cbk);
        } else {
            users.insert({ user_id: userId, blacklisted: { status: true, reason } }, cbk);
        };
    })
};

const whiteListUser = (userId, cbk) => {
    cbk = cbk || callback;
    getUser(userId, (err, data) => {
        if (err) cbk(err, null)
        else if (data.length > 0) {
            let u = data[0];
            u.blacklisted = { status: false };
            u.save(cbk);
        }
    });
};

const getUserCount = (cbk) => {
    users.select({}, (err, data) => {
        if (err) cbk(err, data);
        else cbk(null, data.length);
    });
}

module.exports = {
    saveUser,
    getUser,
    deleteUser,
    blacklistUser,
    whiteListUser,
    isUserBlacklisted,
    getUserCount
}