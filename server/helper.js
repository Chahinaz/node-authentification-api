// Set user info from request
exports.setUserInfo = function(request) {
    console.log("request === ", request);
    return {
        _id: request._id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        role: request.role
    };
};