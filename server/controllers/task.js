'use strict';

const logger = require('../helpers/logger.js'),
    log = logger.create('Task Controller'),
    handleError = require('../helpers/controllerUtils.js').handleError(log),
    //taskExecutor = require('../services/taskExecutor.js'),
    tasks = require('../models/task.js');

module.exports = (router) => {
    router.get('/', (req, res) => {
        tasks.getAll()
            .then((result) => {
                log.info(`List all ${result.length} tasks`);
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
                    log.info(`Created task: ${task.id} for command ${task.command}`);
                    res.json(task);
                })
                .catch((err) => {
                    handleError(res, `Could not create a task for command ${command}. Error: ${err}`);
                });
        }
    });

    router.delete('/:id', (req, res) => {
        tasks.removeById(req.params.id)
            .then((task) => {console.log(task);
                log.info(`Removed task: ${task.id} for command ${task.command}`);
                res.sendStatus(200);
            })
            .catch((err) => {
                handleError(res, `Could not delete task. Error: ${err}`);
            });
    });

    return router;
};
