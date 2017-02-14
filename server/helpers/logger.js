'use strict';

const winston = require('winston');

class LoggerFactory {
    get(category) {
        return winston.loggers.add(category, {
            console: {
                label: category,
                colorize: true,
                timestamp: this._formattedTimestamp
            }
        });
    }

    _formattedTimestamp() {
        const timeNow = new Date();
        return timeNow.toUTCString();
    }
}

module.exports = new LoggerFactory();
