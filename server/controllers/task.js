'use strict';

const logger = require('../helpers/logger.js'),
    log = logger.create('Task Controller'),
    handleError = require('../helpers/controllerUtils.js').handleError,
    taskExecutor = require('../services/taskExecutor.js'),
    task = require('../models/task.js');

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
        const command = req.body.command;
        if (!command) {
            handleError(res, log, 'Cannot create a task without specified OS command');
        } else {
            task.create(command)
                .then((task) => {
                    log.info(`Created task: ${task.id} for command ${task.command}`);
                    res.json(task);
                })
                .catch((err) => {
                    handleError(res, log, `Could not create a task for command ${command}. Error: ${err}`);
                });
        }
    });

    return router;
};
