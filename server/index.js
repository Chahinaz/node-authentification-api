//Imports node modules and init Express
const AuthenticationController = require('./controllers/authentication');
const mongoose = require('mongoose'),
    express = require('express'),
    passport = require('passport'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    config = require('./config/main.js'),
    router = require('./router'),
    cors = require('cors');

//Database connection
mongoose.connect(config.database, { useNewUrlParser: true });

//Start the server
var server;
server = app.listen(config.port);
console.log('Your server is running on port: ' + config.port);

//Setup middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//Enable CORS from client-side
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

router(app);
module.exports = server;
