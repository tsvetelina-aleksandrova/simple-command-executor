'use strict';

const winston = require('winston');

module.exports = () => {
    return {
        create: create
    };

    function create (category) {
        winston.loggers.add(category, {
            console: {
                colorize: true,
                label: category
            }
        });
        return winston.loggers.get(category);
    }
};
