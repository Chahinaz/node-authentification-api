//Setup user information from request
const jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    config = require('../config/main');
    setUserInfo = require('../helper').setUserInfo;

//Generate JWT from user
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 //seconds === 7 days
    });
};

// Login Route
exports.login = function(req, res) {
    const userInfo = req.body;

    User.findOne({email: userInfo.email}, (err, user) => {
        if (err) {
            res.status(422).json({ error: 'No user could be found for this ID.' });
            return next(err);
        }

        if(user.password != userInfo.password)
            return res.status(422).json({error: 'Wrong password or email address.'})

        res.status(200).json({
            token: `JWT ${generateToken(userInfo)}`,
            user: user
        });
    });
};

//Registration Route
exports.register = function(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;


    if(!email || email === '') return res.status(422).send({ error: 'You must enter an email address.'});
    if(!firstName || !lastName || firstName === '' || lastName === '') return res.status(422).send({ error: 'You must enter your full name.'});
    if(!password || password === '' || password.length < 6) return res.status(422).send({ error: 'You must enter a password. Enter at least 6 characters.'});

    User.findOne({email: email}).exec(function(err, existingUser) {
        if(err) return (err);

        if(existingUser) return res.status(422).send({ error: 'That email address is already in use.'});

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
            res.status(422).json({error: 'You are not authorized to view this content.'});
            return next('Unauthorized');
        });
    }
};

//Forgotten Password
exports.forgotPassword = function (req, res, next) {
    //Todo: MailGun module: https://app.mailgun.com/app/dashboard -> need domain
};

//Reset Password
exports.resetPassword = function(req, res, next) {
    //Todo: MailGun module: https://app.mailgun.com/app/dashboard -> need domain


};
