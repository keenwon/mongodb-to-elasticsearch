var mongodbHost = '162.243.150.98',
    mongodbPort = 27017,
    mongodbDatabase = '<Database>',
    mongodbUserName = '<用户名>',
    mongodbPassword = '<密码>';

var util = require('util'),
    mongoose = require('mongoose'),
    uri = util.format('mongodb://%s:%d/%s', mongodbHost, mongodbPort, mongodbDatabase);

//mongoose.set('debug', true);

mongoose.connect(uri, {
    user: mongodbUserName,
    pass: mongodbPassword
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', mongodbDatabase, err.message);
        process.exit(1);
    }
});

mongoose.connection.on('error', function (err) {
    console.error('mongodb error: ' + err);
});

// models
require('./resource');

exports.Resource = mongoose.model('Resource');