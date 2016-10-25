'use strict';

const groups = require('../db').group;
const monitutils = require('./monitutils');
const callback = (err, data) => {
    if (err) console.log('Erro no banco: ', err);
    else console.log('Retorno do banco: ', data.result || data);
};

const saveGroup = (group, cbk) => {
    cbk = cbk || callback;
    groups.select({
        group_id: group.group_id
    }, (err, data) => {
        if (err) cbk(err, null)
        else if (data.length > 0) {
            let u = data[0];
            u.blacklisted = group.blacklisted;
            u.save(cbk);
        } else {
            groups.insert(group, cbk);
        };
    });
};

const getGroup = (groupId, cbk) => {
    cbk = cbk || callback;
    groups.select({
        group_id: groupId
    }, cbk);
};

const getGroups = (cbk) => {
    cbk = cbk || callback;
    groups.getGroups(cbk);
}

const deleteGroup = (groupId, cbk) => {
    cbk = cbk || callback;
    groups.delete({
        group_id: groupId
    }, cbk)
}

const getGroupCount = (cbk) => {
    groups.select({}, (err, data) => {
        if (err) cbk(err, data);
        else cbk(null, data.length);
    });
}

module.exports = {
    saveGroup,
    getGroup,
    deleteGroup,
    getGroupCount,
    getGroups
}