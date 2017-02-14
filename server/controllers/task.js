'use strict';

const LoggerFactory = require('../helpers/logger.js'),
    log = LoggerFactory.get('Task Controller'),
    Task = require('../models/task.js');

class TaskController {
    constructor(router) {
        this._router = router;
    }

    getMiddleware() {
        this._router.post('/', this._create);
        this._router.get('/', this._getAll);
        this._router.get('/:id', this._getById);
        this._router.delete('/:id', this._delete);
        this._router.post('/start/:id', this._start);
        return this._router;
    }

    _create(req, res) {
        const command = req.body.command;
        if (!command) {
            this._handleError(res, 'Cannot create a task without specified OS command');
        } else {
            Task.create(command)
                .then((task) => {
                    log.info(`Created task: ${task.id} for command "${task.command}"`);
                    res.json(task);
                })
                .catch((err) => {
                    this._handleError(res, `Could not create a task for command "${command}". Error: ${err}`);
                });
        }
    }

    _getAll(req, res) {
        Task.getAll(req.query)
            .then((result) => {
                log.info(`List ${result.length} tasks`);
                res.json(result);
            });
    }

    _getById(req, res) {
        Task.getById(req.params.id)
            .then((task) => {
                log.info(`Get data for task ${task.id}`);
                res.json(task);
            })
            .catch((err) => this._handleError(res, `Could not query tasks. Error: ${err}`));
    }

    _delete(req, res) {
        Task.removeById(req.params.id)
            .then((task) => {
                log.info(`Removed task ${task.id} for command "${task.command}"`);
                res.sendStatus(200);
            })
            .catch((err) => {
                this._handleError(res, `Could not delete task. Error: ${err}`);
            });
    }

    _start(req, res) {
        Task.update(req.params.id, {queued: true})
            .then((task) => {
                log.info(`Queued task ${task.id} for execution`);
                res.sendStatus(200);
            })
            .catch((err) => this._handleError(res, `Could not queue task for execution. Error: ${err}`));
    }

    _handleError() {
        return (res, message) => {
            log.error(message);
            res.status(400).json({error: message});
        };
    }
}

module.exports = TaskController;
