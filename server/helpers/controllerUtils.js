'use strict';

module.exports = {handleError};

function handleError(log) {
    return (res, message) => {
        log.error(message);
        res.status(400).json({error: message});
    };
}
