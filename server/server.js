'use strict';

const app = require('express')(),
    bodyParser = require('body-parser'),
    router = require('./router.js'),
    setupDb = require('./storage/connector.js').setup,
    logger = require('./helpers/logger.js'),
    log = logger.create('App Root'),
    config = require('./config/config.js'),
    port = config.get('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router(app);

setupDb();

app.listen(port, () => log.info(`Command executor has started on port ${port}`));
