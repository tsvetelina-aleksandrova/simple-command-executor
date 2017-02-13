'use strict';

const setupDb = require('./storage/connector.js').setup,
    logger = require('./helpers/logger.js'),
    log = logger.create('App Root'),
    config = require('./config/config.js');

setupDb();

if (config.get('enableServer')) {
    const app = require('express')(),
        bodyParser = require('body-parser'),
        router = require('./router.js'),
        port = config.get('port');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    router(app);

    app.listen(port, () => log.info(`Command executor server has started on port ${port}`));
}

if (config.get('enableWorker')) {
    const worker = require('./worker.js');
    log.info('Command execution worker has started');
    worker();
}
