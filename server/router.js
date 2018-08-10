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

};