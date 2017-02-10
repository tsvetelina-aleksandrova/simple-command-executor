'use strict';

const app = require('express')(),
    router = require('./router.js');

router(app);

app.listen(4000, () => console.log('here'));
