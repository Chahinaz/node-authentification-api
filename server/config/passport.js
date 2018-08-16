//Implementing passport, strategies and config

const passport = require('passport'),
    User = require('../models/user'),
    config = require('./main'),
    JwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

const localOptions = {
    userField: 'email'
};

//Setup local login strategy (from passport documentation)
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
   User.findOne({email:email}, function(err, user){
       if(err) return done(err);
       if(!user) return done(null, false, {error: 'Your login details are invalid. Please try again.'});

       user.validPassword(passport, function(err, isMatch){
          if(err) return done(err);
          if(!isMatch) return done(null, false, {error: 'Your login details are invalid. Please try again.'});

          return done(null, user);
       });
   });
});

//Setup JWT authentication
const jwtOptions = {
    jwtFromRequest : extractJwt.fromHeader,
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload._id, function(err, user){
        //if 'payload._id' doesn't work, replace it with 'payload.doc._id' or 'payload.document._id'
       console.log('Payload: ' + payload);

       if (err) return done(err, false);
       if(user){
           done(null, user)
       } else {
           done(null, false)
       }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);