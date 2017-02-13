'use strict';

const _ = require('lodash'),
    uuid = require('uuid'),
    db = require('../storage/connector.js').db,
    tasks = db.get('tasks'),
    taskStatus = require('./taskStatus.js');

module.exports = {create, getAll, getById, removeById};

function create(command) {
    return tasks.push({
            id: uuid(),
            command,
            status: taskStatus.CREATED
        })
        .write()
        .then(() => tasks.last().value());
}

function getAll() {
    const result = tasks.cloneDeep().value();
    return new Promise((resolve) => resolve(_.isEmpty(result) ? [] : result));
}

function getById(id) {
    const task = tasks.find({id}).value();
    return new Promise((resolve, reject) => {
        if (!task) {
            return reject(`Task with id ${id} does not exist`);
        }
        return resolve(task);
    });
}

function removeById(id) {
    return tasks.remove({id}).write()
        .then((result) => {console.log(result);
            if (_.isEmpty(result)) {
                return Promise.reject(`Task with id ${id} does not exist`);
            }
            return result[0];
        });
}


