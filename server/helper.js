// Set user info from request
exports.setUserInfo = function(request) {
    console.log("request === ", request);
    const getUserInfo = {
        _id: request._id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        role: request.role
    };

    return getUserInfo;
};