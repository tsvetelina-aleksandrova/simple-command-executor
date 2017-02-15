'use strict';

const _ = require('lodash'),
    uuid = require('uuid'),
    db = require('../storage/connector.js').db,
    tasks = db.get('tasks'),
    taskStatus = require('./taskStatus.js');

class TaskDAO {

}

TaskDAO.create = (command) => {
    return tasks.push({
            id: uuid(),
            command,
            status: taskStatus.CREATED
        })
        .write()
        .then(() => tasks.last().value());
};

TaskDAO.update = (id, values) => {
    return TaskDAO.getById(id)
        .then(() => tasks.find({id}).assign(values).write())
        .then(resolveTask(id));
};

TaskDAO.getQueued = () => {
    const task = tasks.find({queued: true}).value();
    return createPromise(task);
};

TaskDAO.getAll = (query) => {
    const queryTasks = _.isEmpty(query) ? tasks.cloneDeep() : tasks.filter(query),
        queryResult = queryTasks.value(),
        result = _.isEmpty(queryResult) ? [] : queryResult;
    return createPromise(result);
};

TaskDAO.getById = (id) => {
    const task = tasks.find({id}).value();
    return createPromise(task)
        .then(resolveTask(id));
};

TaskDAO.removeById = (id) => {
    return tasks.remove({id}).write()
        .then((result) => result.length ? result[0] : {})
        .then(resolveTask(id));
};

function resolveTask(id) {
    return (task) => {
        if (_.isEmpty(task)) {
            return Promise.reject(`Task with id ${id} does not exist`);
        }
        return Promise.resolve(task);
    };
}

function createPromise(value) {
    return new Promise((resolve) => resolve(value));
}

module.exports = TaskDAO;
