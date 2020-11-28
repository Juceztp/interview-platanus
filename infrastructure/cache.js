const cache = require('memory-cache');

const getCache = (url) => cache.get(url);
const putCache = (url, value, time) => cache.put(url, value, time);

module.exports = {
    get: getCache,
    put: putCache
}
