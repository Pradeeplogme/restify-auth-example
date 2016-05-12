'use strict';

const uuid = require('node-uuid')
    , config = {
        'secret': '123456',
        'database': 'mongodb://localhost:27017/restify-auth-exemple'
    };

module.exports = config;
