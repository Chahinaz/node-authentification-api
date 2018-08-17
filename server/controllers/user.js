const User = require('../models/user');
const setUserInfo = require('../helper').setUserInfo;

// User route
exports.viewOwnProfile = function (req, res, next) {
    const userId = req.params._id;

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(400).json({ error: 'No user could be found for this ID.' });
            return next(err);
        }
        const userToReturn = setUserInfo(user);
        return res.status(200).json({ user: userToReturn });
    });
};

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
    const user = ({
        email: req.body.email,
        profile: {
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName
        },
        image: req.body.image,
        bio: req.body.bio,
        role: req.body.role,
    });

    User.findByIdAndUpdate({_id: req.params._id,}, user, function(err) {
        if(err) return res.status(422).json({error: err});
        res.status(200).send({message: `User ${user.email} has been updated.`})
    })
};

//All Users
exports.allUsers = function(req, res) {
    User.find({}, function(err, users){
        if(err) return res.status(422).send({message: "An error occurred, please try again."});
        res.send(users)
    });
};