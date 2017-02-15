'use strict';

const LoggerFactory = require('../helpers/logger.js'),
    log = LoggerFactory.get('Task Controller'),
    Task = require('../models/taskDAO.js');

class TaskController {
    create(req, res) {
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

    getAll(req, res) {
        Task.getAll(req.query)
            .then((result) => {
                log.info(`List ${result.length} tasks`);
                res.json(result);
            });
    }

    getById(req, res) {
        Task.getById(req.params.id)
            .then((task) => {
                log.info(`Get data for task ${task.id}`);
                res.json(task);
            })
            .catch((err) => this._handleError(res, `Could not query tasks. Error: ${err}`));
    }

    deleteById(req, res) {
        Task.removeById(req.params.id)
            .then((task) => {
                log.info(`Removed task ${task.id} for command "${task.command}"`);
                res.sendStatus(200);
            })
            .catch((err) => {
                this._handleError(res, `Could not delete task. Error: ${err}`);
            });
    }

    start(req, res) {
        Task.update(req.params.id, {queued: true})
            .then((task) => {
                log.info(`Queued task ${task.id} for execution`);
                res.sendStatus(200);
            })
            .catch((err) => this._handleError(res, `Could not queue task for execution. Error: ${err}`));
    }

    _handleError(res, message) {
        log.error(message);
        res.status(400).json({error: message});
    }
}

module.exports = new TaskController();
