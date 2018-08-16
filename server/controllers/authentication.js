//Setup user information from request
const jwt = require('jsonwebtoken'),
    crypto = require('crypto-js'),
    User = require('../models/user'),
    config = require('../config/main');

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        img: request.profile.img,
        bio: request.profile.bio
    }
}

//Generate JWT from user
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 //seconds
    });
}

// Login Route
exports.login = function(req, res, next) {
    const userInfo = setUserInfo(res.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

//Registration Route
exports.register = function(req,res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if(!email) return res.status(422).send({ error: 'You must enter an email address.'});
    if(!firstName || !lastName) return res.status(422).send({ error: 'You must enter your full name.'});
    if(!password) return res.status(422).send({ error: 'You must enter a password.'});

    User.findOne({email}, function(err, existingUser) {
        if(err) return next(err);
        if(existingUser) return res.status(422).send({ error: 'That email address is already in use.'});

        var user = new User ({
            email: email,
            password: password,
            profile: { firstName, lastName}
        });

        user.save(function(err, user) {
            if(err) return next(err);

            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT '+ generateToken(userInfo),
                user: userInfo
            })
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
