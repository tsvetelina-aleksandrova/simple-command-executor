'use strict';

const LoggerFactory = require('./helpers/logger.js'),
    log = LoggerFactory.get('Command Execution Worker'),
    taskStatus = require('./models/taskStatus.js'),
    Task = require('./models/taskDAO.js'),
    executor = require('./services/commandExecutor.js');

class CommandExecutionWorker {
    constructor() {
        this._pollInterval = 5000;
        this._maxTasks = 3;
        this._runningTasks = 0;
    }

    start() {
        setInterval(this._poll.bind(this), this._pollInterval);
        log.info('Command execution worker has started');
    }

    _poll() {
        if (this._runningTasks < this._maxTasks) {
            Task.getQueued()
                .then((task) => {
                    if (task) {
                        this._runningTasks += 1;
                        log.info(`Running task ${task.id}`);

                        this._run(task)
                            .then(() => {
                                this._runningTasks -= 1;
                                Task.update(task.id, {queued: false});
                            });
                    }
                });
        }
    }

    _run(task) {
        return Task.update(task.id, {status: taskStatus.RUNNING})
            .then(() => executor.exec(task.command))
            .then((result) => {
                log.info(`Completed task ${task.id} successfully`);
                return Task.update(task.id, {result, status: taskStatus.COMPLETED});
            })
            .catch((err) => {
                log.info(`Completed task ${task.id} failed with error ${err.code}`);
                return Task.update(task.id, {result: err, status: taskStatus.FAILED});
            });
    }

}


module.exports = new CommandExecutionWorker();
