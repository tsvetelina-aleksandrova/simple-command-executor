'use strict';

const logger = require('../helpers/logger.js')(),
    log = logger.create('Task Controller');

module.exports = (router) => {
    router.get('/', (req, res) => {
        log.info('get all');
        res.sendStatus(200);
    });

    router.get('/:id', (req, res) => {
        log.info('get one');
        res.sendStatus(200);
    });

    router.post('/', (req, res) => {
        log.info('create new');
        res.sendStatus(200);
    });

    return router;
};
