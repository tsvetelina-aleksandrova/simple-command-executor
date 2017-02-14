'use strict';

const DbConnector = require('./storage/connector.js'),
    LoggerFactory = require('./helpers/logger.js'),
    log = LoggerFactory.get('App Root');

class CommandExecutionServer {
    start(opts) {
        DbConnector.setup();

        if (opts.startServer) {
            this._startServer(opts.port);
        }
        if (opts.startWorker) {
            this._startWorker();
        }
    }

    _startServer(port) {
        const express = require('express'),
            app = express(),
            router = express.Router(),
            bodyParser = require('body-parser'),
            TaskController = require('./controllers/task.js'),
            taskController = new TaskController(router);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use('/tasks', taskController.getMiddleware(router));

        app.listen(port, () => log.info(`Command executor server has started on port ${port}`));
    }

    _startWorker() {
        const CommandExecutionWorker = require('./services/worker.js'),
            worker = new CommandExecutionWorker();
        worker.start();
    }
}

module.exports = new CommandExecutionServer();
