'use strict';

const _ = require('lodash'),
    uuid = require('uuid'),
    db = require('../storage/connector.js').db,
    tasks = db.get('tasks'),
    taskStatus = require('./taskStatus.js');

module.exports = {create, update, getQueued, getAll, getById, removeById};

function create(command) {
    return tasks.push({
            id: uuid(),
            command,
            status: taskStatus.CREATED
        })
        .write()
        .then(() => tasks.last().value());
}

function update(id, values) {
    return tasks.find({id}).assign(values).write()
        .then(resolveTask(id));
}

function getQueued() {
    const task = tasks.find({queued: true}).value();
    return createPromise(task);
}

function getAll(query) {
    const queryTasks = _.isEmpty(query) ? tasks.cloneDeep() : tasks.filter(query),
        queryResult = queryTasks.value(),
        result = _.isEmpty(queryResult) ? [] : queryResult;
    return createPromise(result);
}

function getById(id) {
    const task = tasks.find({id}).value();
    return createPromise(task)
        .then(resolveTask(id));
}

function removeById(id) {
    return tasks.remove({id}).write()
        .then((result) => result.length ? result[0] : {})
        .then(resolveTask(id));
}

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
