//Imports node modules and init Express
const express = require('express'),
    app = express(),
    logger= require('morgan'),
    config = require('./config/main');

//Start server
const server = app.listen(config.port);
console.log('Your server is running on port: ' + config.port);

//Setup middleware
app.use(logger('dev'));

//Enable CORS from client-side
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
   res.header("Access-Control-Allow-Credentials", "true");
   next;
});