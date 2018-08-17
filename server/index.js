//Imports node modules and init Express
const mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    config = require('./config/main.js'),
    router = require('./router');

//Database connection
mongoose.connect(config.database, { useNewUrlParser: true });

//Start the server
app.listen(config.port);
console.log('Your server is running on port: ' + config.port);

//Setup middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));


app.options("/*", function(req, res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.status(200).send();
});

app.post("/*", function(req, res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.status(200).send();
});


router(app);

module.exports = app;
