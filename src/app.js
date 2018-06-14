const express = require('express');
const app = express();
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');
const robots = require('express-robots');

const getEnv = require('./helpers/getEnv');

/**
 * Express configuration.
 */
app.disable('x-powered-by');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(errorHandler());
app.use(robots({UserAgent: '*', Disallow: '/'}));


/**
 * Config routes.
 */
app.use(require('./app.routes'));

/**
 * HTTP Server
 */
const port = getEnv('/port');
const server = require('http').createServer(app);
server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});