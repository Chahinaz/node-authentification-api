const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passport = require('passport');

//Require Middleware to login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

//Set up routes
module.exports = function(app) {
    const apiRoutes = express.Router();

    //Home route
    app.get('/', function(req, res){
        res.send("Welcome to Chahinaz' home ~ ")
    });

    //url for API group
    app.use('/api', apiRoutes);

    // Registration route
    app.post('/register', function(req, res){
        AuthenticationController.register(req, res)
    });

    // Login route
    app.post('/login', function(req, res){
        AuthenticationController.login(req, res)
    });

    //All Users route
    app.get('/users', AuthenticationController.allUsers);

    //route for status(404)
    app.use(function(req, res) {
        res.status(404).send({error: 'URL not found.\n'})
    });
};

