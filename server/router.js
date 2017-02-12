'use strict';

const router = require('express').Router(),
    task = require('./controllers/task.js');

module.exports = (app) => {
    app.use('/tasks', task(router));
};
