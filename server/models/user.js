const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    jswt = require('jsonwebtoken'),
    crypto = require('crypto-js'),
    bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank. Please fill the email input."]
    },
    password: {
        type: String,
        required: [true, "Can't be blank. Please fill the password input."]
    },
    profile: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum : ['Engineer', 'Student', 'Someone playing around']
        },
        image: String,
        bio: String
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

//Save user to DB and hash password if new or edited
UserSchema.pre('save', function(next){
    const user = this, SALT_FACTOR = 5;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

//Check user's password
UserSchema.methods.validPassword = function(givenPassword, cb) {
    bcrypt.compare(givenPassword, this.password, function(err, isMatch){
        if (err) return cb(err);

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);