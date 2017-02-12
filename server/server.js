'use strict';

const app = require('express')(),
    router = require('./router.js'),
    logger = require('./helpers/logger.js'),
    log = logger.create('App Root'),
    config = require('./config/config.js'),
    port = config.get('port');

router(app);

app.listen(port, () => log.info(`Command executor has started on port ${port}`));
