'use strict';

const winston = require('winston');

module.exports = () => {
    return {
        create: create
    };

    function create (category) {
        winston.loggers.add(category, {
            console: {
                label: category,
                colorize: true,
                timestamp: formattedTimestamp
            }
        });
        return winston.loggers.get(category);
    }

    function formattedTimestamp() {
        const timeNow = new Date();
        return timeNow.toUTCString();
    }
};
