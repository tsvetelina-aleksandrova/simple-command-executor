'use strict';

const applicationServer = require('./applicationServer.js'),
    commandExecutionWorker = require('./commandExecutionWorker.js'),
    DbConnector = require('./storage/connector.js'),
    configuration = require('./config/config.js'),
    configuredOptions = configuration.getOptions();

DbConnector.setup();

if (configuredOptions.startServer) {
    applicationServer.start(configuredOptions.port);
}

if (configuredOptions.startWorker) {
    commandExecutionWorker.start();
}
