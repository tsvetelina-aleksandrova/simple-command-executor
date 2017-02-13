'use strict';

const logger = require('../helpers/logger.js'),
    log = logger.create('Task Controller'),
    handleError = require('../helpers/controllerUtils.js').handleError(log),
    taskStatus = require('../models/taskStatus.js'),
    tasks = require('../models/task.js');

module.exports = (router) => {
    router.get('/', (req, res) => {
        tasks.getAll(req.query)
            .then((result) => {
                log.info(`List ${result.length} tasks`);
                res.json(result);
            });
    });

    router.get('/:id', (req, res) => {
        tasks.getById(req.params.id)
            .then((task) => {
                log.info(`Get data for task ${task.id}`);
                res.json(task);
            })
            .catch((err) => handleError(res, `Could not query tasks. Error: ${err}`));
    });

    router.post('/', (req, res) => {
        const command = req.body.command;
        if (!command) {
            handleError(res, 'Cannot create a task without specified OS command');
        } else {
            tasks.create(command)
                .then((task) => {
                    log.info(`Created task: ${task.id} for command "${task.command}"`);
                    res.json(task);
                })
                .catch((err) => {
                    handleError(res, `Could not create a task for command "${command}". Error: ${err}`);
                });
        }
    });

    router.post('/start/:id', (req, res) => {
        tasks.update(req.params.id, {status: taskStatus.RUNNING})
            .then((task) => {
                log.info(`Queued task ${task.id} for execution`);
                res.sendStatus(200);
            })
            .catch((err) => handleError(res, `Could not queue task for execution. Error: ${err}`));
    });

    router.delete('/:id', (req, res) => {
        tasks.removeById(req.params.id)
            .then((task) => {
                log.info(`Removed task ${task.id} for command "${task.command}"`);
                res.sendStatus(200);
            })
            .catch((err) => {
                handleError(res, `Could not delete task. Error: ${err}`);
            });
    });

    return router;
};
