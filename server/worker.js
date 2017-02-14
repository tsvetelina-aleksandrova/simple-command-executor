'use strict';

const logger = require('./helpers/logger.js'),
    log = logger.create('Task Worker'),
    taskStatus = require('./models/taskStatus.js'),
    tasks = require('./models/task.js'),
    executor = require('./services/executor.js'),
    pollInterval = 5000,
    maxTasks = 3;

let running = 0;

module.exports = () => {
    setInterval(poll, pollInterval);
    log.info('Command execution worker has started');
};

function poll() {
    if (running < maxTasks) {
        tasks.getQueued()
            .then((task) => {
                if (task) {
                    running += 1;
                    log.info(`Running task ${task.id}`);

                    run(task)
                        .then(() => {
                            running -= 1;
                            tasks.update(task.id, {queued: false});
                        });
                }
            });
    }
}

function run(task) {
    return tasks.update(task.id, {status: taskStatus.RUNNING})
        .then(() => executor.exec(task.command))
        .then((result) => {
            log.info(`Completed task ${task.id} successfully`);
            return tasks.update(task.id, {result, status: taskStatus.COMPLETED});
        })
        .catch((err) => {
            log.info(`Completed task ${task.id} failed with error ${err.code}`);
            return tasks.update(task.id, {result: err, status: taskStatus.FAILED});
        });
}
