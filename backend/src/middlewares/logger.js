const morgan = require('morgan');

// Logger middleware using morgan
const logger = morgan('dev');

module.exports = logger;
