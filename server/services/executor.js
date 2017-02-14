'use strict';

const _ = require('lodash'),
    childExec = require('child_process').exec;

module.exports = {exec};

function exec(command) {
    return new Promise(doExec(command));
}

function doExec(command) {
    return (resolve, reject) => {
        childExec(command, (error, stdout, stderr) => {
            const res = {out: stdout, err: stderr, code: _.get(error, 'code', 0)};
            return error ? reject(res) : resolve(res);
        });
    };
}
