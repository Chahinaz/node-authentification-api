//Imports node modules and init Express
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main.js'),
    router = require('./router');

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


//========================================
//                                      //
//                 ROUTE                //
//                                      //
//========================================

/**
 * MONGOOSE *
 //Database connection
 mongoose.connect(config.database, { useNewUrlParser: true } );
 */

//Used function to look on dataBase
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
};

// Connection URL and Database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'chahinaz';

var results = [];

// Use connect method to connect to the server
MongoClient.connect(config.database, { useNewUrlParser: true },  function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    console.log("Connected successfully to server, at port: " + config.port);

    findDocuments(db, function(docs){
        results = docs
    });
});

app.get('/', function(req, res) {
    res.send(results)
});

var server = app.listen(config.port)
console.log('Your server is running on port: ' + config.port);

router(app);
