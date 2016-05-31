'use strict';

const uuid = require('node-uuid')
    , config = {
      'jwtSecrect': '123456'
      , 'passwordSalt': '789123456789'
      , 'database': 'mongodb://localhost:27017/restify-auth-exemple'
    };

module.exports = config;
