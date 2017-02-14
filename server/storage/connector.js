'use strict';

const lowdb = require('lowdb'),
    fileAsync = require('lowdb/lib/storages/file-async');

class DbConnector {
    constructor() {
        this.db = lowdb('./server/storage/storage.json', {storage: fileAsync});
    }

    setup() {
        if (!this.db.has('tasks').value()) {
            this.db.set('tasks', []).write();
        }
    }
}

module.exports = new DbConnector();
