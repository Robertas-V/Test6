const mongoose = require('mongoose');

// TEST DB
// mongodb://han_solo:chewbacca@ds011379.mlab.com:11379/mean-boilerplate

// PROD DB
// mongodb://han_solo:chewbacca@ds011419.mlab.com:11419/mean-boilerplate-test

function init() {
    return mongoose.createConnection('mongodb://localhost:27017/mean-boilerplate');
}

module.exports.init = init;
