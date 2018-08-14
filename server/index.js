//Imports node modules and init Express
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main.js'),
    router = require('./router');

//Start server
const server = app.listen(config.port);
console.log('Your server is running on port: ' + config.port);

//Database connection
mongoose.connect(config.database, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Setup middleware
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