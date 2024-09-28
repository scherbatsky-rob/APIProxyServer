// MorganLogger.js

const morgan = require('morgan');
const Logger = require('./Logger');

class MorganLogger extends Logger {
    constructor() {
        super();
        morgan.token('rate-limit', (req) => (req.rateLimitExceeded ? 'Rate limit exceeded' : 'Within rate limit'));
        this.logger = morgan(':date[iso] :remote-addr :method :url :status :response-time ms - :res[content-length] :rate-limit');
    }

    getMiddleware() {
        return this.logger;
    }
}

module.exports = MorganLogger;