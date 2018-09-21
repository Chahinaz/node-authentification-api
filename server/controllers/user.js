const User = require('../models/user');
const setUserInfo = require('../helper').setUserInfo;

//Drop user
exports.removeUser = function(req, res){
    const email = req.body.email;

    User.findOneAndDelete({email: email}, function(err){
        if(err) return err;
        else res.json({message: "User account deleted."});

    })
};

//Update user's information
exports.updateUser = function(req, res){
    if(!req.body) return res.status(422).json({error: "You should fill the fields to dave."});
    if(!req.body.firstName || !req.body.lastName || req.body.firstName === '' || req.body.lastName === '')
        return res.status(422).send({ error: 'You must enter your full name.'});

    User.findByIdAndUpdate({_id: req.body._id,}, user, function(err) {
        if(err) return res.status(422).json({error: err});
        res.status(200).send({message: `User ${user.profile.firstName} ${user.profile.lastName} has been updated.`})
    })
};

//All Users
exports.allUsers = function(req, res) {
    User.find({}, function(err, users){
        if(err) return res.status(422).send({message: "An error occurred, please try again."});
        res.send(users)
    });
};

// User route
exports.profile = function (req, res, next) {
    const userEmail = req.body.email;

    User.find({email: userEmail}, (err, user) => {
    console.log("user === ", user)
        if (err) {
            res.status(422).json({ error: 'No user could be found for this ID.' });
            return next(err);
        }
        const userToReturn = setUserInfo(user);
        return res.status(200).json({ user: userToReturn });
    });
};