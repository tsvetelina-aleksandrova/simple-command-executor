'use strict';

const _ = require('lodash'),
    childExec = require('child_process').exec;

class CommandExecutor {
    exec(command) {
        return new Promise(this._doExec(command));
    }

    _doExec(command) {
        return (resolve, reject) => {
            childExec(command, (error, stdout, stderr) => {
                const res = {out: stdout, err: stderr, code: _.get(error, 'code', 0)};
                return error ? reject(res) : resolve(res);
            });
        };
    }
}

module.exports = new CommandExecutor();
