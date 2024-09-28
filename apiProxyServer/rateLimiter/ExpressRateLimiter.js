// ExpressRateLimiter.js

const rateLimit = require('express-rate-limit');
const RateLimiter = require('./RateLimiter');

class ExpressRateLimiter extends RateLimiter {
    constructor(windowMs, max) {
        super();
        this.limiter = rateLimit({
            windowMs: windowMs,
            max: max,
            message: 'Too many requests, please try again later.',
            standardHeaders: true,
            legacyHeaders: false,
        });
    }

    getMiddleware() {
        return this.limiter;
    }
}

module.exports = ExpressRateLimiter;