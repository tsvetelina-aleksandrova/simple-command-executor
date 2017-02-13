'use strict';

const lowdb = require('lowdb'),
    fileAsync = require('lowdb/lib/storages/file-async'),
    db = lowdb('./server/storage/storage.json', {storage: fileAsync});

module.exports = {db, setup};

function setup() {
    if (!db.has('tasks').value()) {
        db.set('tasks', []).write();
    }
}
