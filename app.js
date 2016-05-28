'use strict';


/* ########## Setup ########## */
const restify = require( 'restify' )
    , app = restify.createServer( {name: 'restify-auth-exemple'} )
    , mongoose = require('mongoose')
    , jwt    = require('jsonwebtoken')
    , morgan = require('morgan')
    , config = require('./config')
    , User   = require('./models/User')
    , port = process.env.PORT || 8080;

mongoose.connect(config.database);

// Plugins
app.use(restify.CORS({ origins: ['*'] }));
app.use(restify.queryParser());
app.use(restify.gzipResponse());
app.use(restify.bodyParser());
app.use(restify.urlEncodedBodyParser());
app.use(morgan('dev'));

/* #################### */

/* ########## Models ########## */


/* ########## Controllers ########## */



/* ########## Routes ########## */

const routes = require('./routes')(app);

/* #################### */


/* ########## Start ########## */

app.listen(port, function () {
    console.log( '%s listening at %s', app.name, app.url );
});
