const mongoose = require('mongoose');

// TEST DB
// mongodb://han_solo:chewbacca@ds011379.mlab.com:11379/mean-boilerplate

// PROD DB
// mongodb://han_solo:chewbacca@ds011419.mlab.com:11419/mean-boilerplate-test

function init() {
    return mongoose.createConnection(
        'mongodb://evaldas:ujthUZDCr6BwkaXQ@development-shard-00-00-ogafb.gcp.mongodb.net:27017,development-shard-00-01-ogafb.gcp.mongodb.net:27017,development-shard-00-02-ogafb.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Development-shard-0&authSource=admin&retryWrites=true'
    );
}

module.exports.init = init;
