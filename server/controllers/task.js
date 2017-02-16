'use strict';

const logger = require('../helpers/logger.js'),
    log = logger.create('Task Controller'),
    tasks = require('../models/task.js');

module.exports = (router) => {
    router.get('/', getAll);
    router.post('/', create);
    router.get('/:id', getById);
    router.delete('/:id', deleteById);
    router.post('/start/:id', start);
    return router;
};

function create(req, res) {
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
}

function getAll(req, res) {
    tasks.getAll(req.query)
        .then((result) => {
            log.info(`List ${result.length} tasks`);
            res.json(result);
        });
}

function getById(req, res) {
    tasks.getById(req.params.id)
        .then((task) => {
            log.info(`Get data for task ${task.id}`);
            res.json(task);
        })
        .catch((err) => handleError(res, `Could not query tasks. Error: ${err}`));
}

function deleteById(req, res) {
    tasks.removeById(req.params.id)
        .then((task) => {
            log.info(`Removed task ${task.id} for command "${task.command}"`);
            res.sendStatus(200);
        })
        .catch((err) => {
            handleError(res, `Could not delete task. Error: ${err}`);
        });
}

function start(req, res) {
    tasks.update(req.params.id, {queued: true})
        .then((task) => {
            log.info(`Queued task ${task.id} for execution`);
            res.sendStatus(200);
        })
        .catch((err) => handleError(res, `Could not queue task for execution. Error: ${err}`));
}

function handleError(res, message) {
    log.error(message);
    res.status(400).json({error: message});
}
