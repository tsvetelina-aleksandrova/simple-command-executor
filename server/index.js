'use strict';

const server = require('./server.js'),
    configuration = require('./config/config.js'),
    configuredOptions = configuration.getOptions();

server.start(configuredOptions);
