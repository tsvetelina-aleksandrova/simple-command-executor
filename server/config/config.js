'use strict';

const convict = require('convict'),
    config = convict({
        port: {
            doc: 'The port the server will listen on',
            format: 'port',
            default: 4000,
            arg: 'port'
        }
    });

config.validate();

module.exports = config;
