'use strict';

const convict = require('convict');

class CommandExecutorConfiguration {
    constructor() {
        this._config = convict({
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
                doc: 'Enable command execiton tasks REST server',
                format: 'Boolean',
                default: true,
                arg: 'enableServer'
            }
        });

        this._config.validate();
    }

    getOptions() {
        return {
            startServer: this._config.get('enableServer'),
            startWorker: this._config.get('enableWorker'),
            port: this._config.get('port')
        };
    }
}

module.exports = new CommandExecutorConfiguration();
