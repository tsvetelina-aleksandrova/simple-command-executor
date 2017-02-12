'use strict';

const winston = require('winston');

module.exports = {create};

function create (category) {
    return winston.loggers.add(category, {
        console: {
            label: category,
            colorize: true,
            timestamp: formattedTimestamp
        }
    });
}

function formattedTimestamp() {
    const timeNow = new Date();
    return timeNow.toUTCString();
}
