const redisClient = require('../redis.limit');
const getUserIP = require('../helpers/getUserIP');

const _initial = (key, expires) => {
    return redisClient.lpushAsync(key, '')
        .then((total) => {
            redisClient.expireAsync(key, expires);

            return total;
        });
};

const _increase = (key) => {
    return redisClient.lpushAsync(key, '');
};

const _total = (key) => {
    return redisClient.llenAsync(key);
};

const _handlerDefault = (req, res) => {
    res.status(429).send('429: Too Many Requests.');
};

const _getKeyDefault = (req, res) => {
    const userIP = getUserIP(req);

    return `IP:${userIP}`;
};

exports.limit = (options) => (req, res, next) => {
    const defaultArgs = {
        limit: 60,//total number of requests
        window: 60,//duration over which rate-limiting, (seconds),
        handler: null,
        getKey: null,
    };

    const {limit, window, handler, getKey} = Object.assign({}, defaultArgs, options);
    const limitValidated = limit ? parseInt(limit, 10) : 60;
    const windowValidated = window ? parseInt(window, 10) : 60;
    const handlerValidated = typeof handler === 'function' ? handler : _handlerDefault;
    const getKeyValidated = typeof getKey === 'function' ? getKey : _getKeyDefault;

    const key = getKeyValidated(req, res);

    _total(key)
        .then(count => {
            if (!count) {
                return _initial(key, windowValidated);
            }

            if (count > limitValidated) {//No need to increase (save time)
                return count;
            }

            return _increase(key);
        })
        .then(total => {
            if (total <= limitValidated) {
                return next();
            }

            handlerValidated(req, res);
        });
};
