'use strict';

const logger = require('../helpers/logger.js'),
    log = logger.create('Task Controller'),
    taskExecutor = require('../services/taskExecutor.js');

module.exports = (router) => {
    router.get('/', (req, res) => {
        //log.info('get all');
        var cmd = 'node --ver';
        taskExecutor.exec(cmd)
            .then((res) => console.log(res.stdout, res.stderr))
            .catch((err) => console.log(err));
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
