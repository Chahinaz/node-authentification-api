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
// mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true } );

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

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('cities');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';


let cities = []

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function(docs){
       cities = docs
    });

});

app.get('/', function(req, res) {
    res.send(cities);
});




router(app);