const AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport');

//Require Middleware to login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

//Role type const
const REQUIRE_ADMIN = "Admin",
    REQUIRE_MEMBER = "Member";

//Set up routes
module.exports = function(app) {
    const apiRoutes = express.Router(),
        authRoutes = express.Router();

    //auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    //url for API group
    app.use('/api', apiRoutes);
};

