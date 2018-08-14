const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const express = require('express');
const passport = require('passport');
const passportService = require('./config/passport');



//Require Middleware to login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

//Set up routes
module.exports = function(app) {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();

    //auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);
    //url for API group
    app.use('/api', apiRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    //route for status(404)
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found.\n'})
    });
};

