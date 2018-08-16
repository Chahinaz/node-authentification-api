const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passport = require('passport');



//Require Middleware to login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

//Set up routes
module.exports = function(app) {
    const apiRoutes = express.Router();

    //url for API group
    app.use('/api', apiRoutes);

    // Registration route
    apiRoutes.post('/register', AuthenticationController.register);

    // Login route
    apiRoutes.post('/login', requireLogin, AuthenticationController.login);

    //ForgottenPassword route
    apiRoutes.use('/forgotpassword', AuthenticationController.forgotPassword);

    //ResetPassword
    apiRoutes.use('/resetpassword', AuthenticationController.resetPassword);

    //route for status(404)
    app.use(function(req, res) {
        res.status(404).send({error: 'URL not found.\n'})
    });
};

