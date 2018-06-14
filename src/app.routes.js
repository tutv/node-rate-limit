const express = require('express');
const router = express.Router();

const rateLimit = require('./middleware/rate-limit');


router.all('/', (req, res) => res.send('OK'));
router.all('/ping', (req, res) => res.send('pong'));

const test = require('./controllers/test');
router.get('/limit',
    rateLimit.limit({
        limit: 30,
        window: 60
    }),
    test.limit
);

module.exports = router;