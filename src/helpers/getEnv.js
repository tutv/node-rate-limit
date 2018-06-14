const Confidence = require('confidence');

const data = {
    port: {
        $filter: 'env',
        $default: 4900,
        staging: 4901,
        production: 4900
    },

    redis: {
        $filter: "env",
        $default: {
            host: '127.0.0.1',
            port: 6379,
            db: 3,
        },
        production: {
            host: '127.0.0.1',
            port: 6379,
            db: 3,
        }
    },
};

const store = new Confidence.Store(data);
const criteria = {
    env: process.env.NODE_ENV || 'development'
};

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue;
};