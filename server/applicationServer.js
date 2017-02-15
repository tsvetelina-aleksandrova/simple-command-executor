'use strict';

const LoggerFactory = require('./helpers/logger.js'),
    log = LoggerFactory.get('App Root');

class ApplicationServer {
    start(port) {
        const express = require('express'),
            app = express(),
            router = express.Router(),
            bodyParser = require('body-parser');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use('/tasks', this._getTaskRoutes(router));

        app.listen(port, () => log.info(`Command execution server has started on port ${port}`));
    }

    _getTaskRoutes(router) {
        const taskController = require('./controllers/taskController.js');

        router.post('/', taskController.create.bind(taskController));
        router.get('/', taskController.getAll.bind(taskController));
        router.get('/:id', taskController.getById.bind(taskController));
        router.delete('/:id', taskController.deleteById.bind(taskController));
        router.post('/start/:id', taskController.start.bind(taskController));

        return router;
    }
}

module.exports = new ApplicationServer();
