'use strict';

const setupDb = require('./storage/connector.js').setup,
    logger = require('./helpers/logger.js'),
    log = logger.create('App Root'),
    config = require('./config/config.js');

setupDb();

if (config.get('enableServer')) {
    const express = require('express'),
        app = express(),
        router = express.Router(),
        tasks = require('./controllers/task.js'),
        bodyParser = require('body-parser'),
        port = config.get('port');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/tasks', tasks(router));

    app.listen(port, () => log.info(`Command execution server has started on port ${port}`));
}

if (config.get('enableWorker')) {
    const worker = require('./worker.js');
    worker();
}
