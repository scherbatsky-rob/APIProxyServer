// AccuWeatherService.js

const axios = require('axios');

class AccuWeatherService {
    constructor(apiKey, cache) {
        this.apiKey = apiKey;
        this.cache = cache;
    }

    async getTopCities(numberOfCities) {
        const url = `http://dataservice.accuweather.com/locations/v1/topcities/${numberOfCities}?apikey=${this.apiKey}`;

        const cachedResponse = this.cache.get(url);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await axios.get(url);
            this.cache.set(url, response.data); // Cache the response
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Error fetching data from AccuWeather API: ${error.response.data.Message}`);
            } else if (error.request) {
                throw new Error('No response received from AccuWeather API');
            } else {
                throw new Error(`Error setting up request to AccuWeather API: ${error.message}`);
            }
        }
    }
}

module.exports = AccuWeatherService;