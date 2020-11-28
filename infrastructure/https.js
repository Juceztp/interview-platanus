const https = require('https');
const cache = require('./cache');

//Constants
const TIME_CACHE = 100 * 1000;

const get = (path) => {
    return new Promise((resolve, reject) => {
        https.get(path, (response) => {
            const cached = cache.get(path);
            if (cached) resolve(cached);
            response.setEncoding('utf8');
            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    cache.put(path, parsedData, TIME_CACHE);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

module.exports = {
    get
}