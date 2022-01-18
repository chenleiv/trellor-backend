var config;

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    // we are in production - return the prod set of keys
    config = require('./prod');
} else {
    // we are in development - return the dev keys!!!
    config = require('./dev');
    // config = require('./dev')
}

module.exports = config;
