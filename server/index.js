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
 Database connection:
    mongoose.connect(config.database, { useNewUrlParser: true } );
*/

// Connection URL and Database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'chahinaz';
var results = [];

//Used function to look on dataBase
const findUsersDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
};

//Use connect method to connect to the server
app.get('/users', function(req, res) {
    MongoClient.connect(config.database, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        console.log("Connected successfully to server, at port: " + config.port);

        findUsersDocuments(db, function(docs){
            results = docs
            // db.close;
        });
    });
    res.send(results)
});

var server = app.listen(config.port)
console.log('Your server is running on port: ' + config.port);

router(app);
