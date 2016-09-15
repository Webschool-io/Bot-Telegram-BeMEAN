'use strict';

const mongoose = require('mongoose');
const dbURI = process.env.dbURI || 'mongodb://localhost/bemean';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

mongoose.connection.on('  ', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
mongoose.connection.on('open', function () {
    console.log('Mongoose default connection is open');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    setting: require('./setting'),
    user: require('./user')
};