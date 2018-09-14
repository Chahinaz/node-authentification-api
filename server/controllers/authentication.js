//Setup user information from request
const jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    config = require('../config/main');
    setUserInfo = require('../helper').setUserInfo;

//Generate JWT from user
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 //seconds
    });
};

// Login Route
exports.login = function(req, res) {
    const userInfo = setUserInfo(req.body);
    console.log("our USER =============================================")
    console.log(userInfo)

    //TODO : get User by email, check Pwd, if success return userInfo
    //TODO: get user's token,

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
};

//Registration Route
exports.register = function(req, res, next) {
    console.log("register == ", req.body);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;


    if(!email || email === '') return res.status(433).send({ error: 'You must enter an email address.'});
    if(!firstName || !lastName || firstName === '' || lastName === '') return res.status(455).send({ error: 'You must enter your full name.'});
    if(!password || password === '' || password.length < 6) return res.status(444).send({ error: 'You must enter a password. Enter at least 6 characters.'});

    User.findOne({email: email}).exec(function(err, existingUser) {
        if(err) return (err);

        if(existingUser) return res.status(500).send({ error: 'That email address is already in use.'});

        const user = new User ({
            email: email,
            password: password,
            profile: { firstName, lastName}
        });

        user.save(function(err, user) {
            if(err) return next(err);

            const userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT '+ generateToken(userInfo),
                user: userInfo
            });
        })
    })
};

//Authorization Middleware
exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser){
            if (err) {
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            if (foundUser.role === role) return next();
            res.status(401).json({error: 'You are not authorized to view this content.'});
            return next('Unauthorized');
        });
    }
};

//Forgotten Password
exports.forgotPassword = function (req, res, next) {

};

//Reset Password
exports.resetPassword = function(req, res, next) {

};
