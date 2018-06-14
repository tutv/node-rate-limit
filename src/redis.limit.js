const createConnectionRedis = require('./libs/createRedis');
const getEnv = require('./helpers/getEnv');
const redisConfig = getEnv('/redis');
const client = createConnectionRedis(redisConfig);

module.exports = client;