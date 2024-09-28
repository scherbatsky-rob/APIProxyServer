require('dotenv').config();
const express = require('express');
const MorganLogger = require('./logger/MorganLogger');
const ExpressRateLimiter = require('./rateLimiter/ExpressRateLimiter');
const NodeCacheAdapter = require('./cache/NodeCacheAdapter');
const BasicAuthenticator = require('./authenticator/BasicAuthenticator');
const AccuWeatherService = require('./services/AccuWeatherService');

const app = express();
const port = process.env.PORT || 3000;

// Initialize components
const logger = new MorganLogger();
const rateLimiter = new ExpressRateLimiter(parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10), parseInt(process.env.RATE_LIMIT_MAX, 10));
const cache = new NodeCacheAdapter(parseInt(process.env.CACHE_DURATION, 10));
const authenticator = new BasicAuthenticator();
const accuWeatherService = new AccuWeatherService(process.env.X_API_KEY, cache);

// Middleware
app.use(logger.getMiddleware());
app.use(rateLimiter.getMiddleware());
app.use((req, res, next) => authenticator.authenticate(req, res, next));

// Route
app.get('/proxy', async (req, res) => {
    try {
        const data = await accuWeatherService.getTopCities(150);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});