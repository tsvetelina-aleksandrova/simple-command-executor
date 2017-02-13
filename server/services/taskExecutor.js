'use strict';

const childExec = require('child_process').exec;

module.exports = {exec};

function exec(command) {
    return new Promise(doExec(command));
}

function doExec(command) {
    return (resolve, reject) => {
        childExec(command, (error, stdout, stderr) => {
            if (error) {
                return reject({code: error.code, data: stderr});
            } else {
                return resolve({stdout});
            }
        });
    };
}
