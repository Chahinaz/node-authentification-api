var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
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
    const user = this,
        salt = 5;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(salt, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Check user's password
UserSchema.methods.resetPassword = function(givenPassword, cb) {
    bcrypt.compare(givenPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;