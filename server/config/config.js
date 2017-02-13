'use strict';

const convict = require('convict'),
    config = convict({
        port: {
            doc: 'The port the server will listen on',
            format: 'port',
            default: 4000,
            arg: 'port'
        },
        enableWorker: {
            doc: 'Enable command execution worker',
            format: 'Boolean',
            default: true,
            arg: 'enableWorker'
        },
        enableServer: {
            doc: 'Enable command execiton tasks REST API',
            format: 'Boolean',
            default: true,
            arg: 'enableApi'
        }
    });

config.validate();

module.exports = config;
