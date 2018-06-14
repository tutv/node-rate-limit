const redis = require("redis");

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = createConnection = (args) => {
    const _client = redis.createClient(args);

    _client.on('connect', () => {
        console.log('Redis is connected.');
    });

    _client.on('error', (error) => {
        console.error(error);

        process.exit();
    });

    process.on('SIGINT', () => {
        _client.quit();
        process.exit();
    });

    return _client
};
