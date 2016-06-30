"use strict";


/* ########## Setup ########## */
const restify = require( "restify" )
    , app = restify.createServer( {name: "restify-auth-exemple"} )
    , promise = require("bluebird")
    , mongoose = promise.promisifyAll(require("mongoose"))
    , morgan = require("morgan")
    , config = require("./config")
    , port = process.env.PORT || 8080;

mongoose.connect(config.database);

// Plugins

app.use(restify.CORS({ origins: ["*"] }));
app.use(restify.queryParser());
app.use(restify.gzipResponse());
app.use(restify.bodyParser());
app.use(restify.urlEncodedBodyParser());
app.use(morgan("dev"));

/* #################### */

/* ########## Models ########## */


/* ########## Controllers ########## */



/* ########## Routes ########## */

require("./routes")(app);

/* #################### */


/* ########## Start ########## */

app.listen(port, function () {
	console.log( "%s listening at %s", app.name, app.url );
});
