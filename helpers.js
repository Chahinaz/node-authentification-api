//Role type const
const ROLE_ADMIN = "Admin";
const ROLE_MEMBER = "Member";

exports.setUserInfo = function setUserInfo(request) {
    return {
      _id: request._id,
      email: request.email,
      firstName: request.profile.firstName,
      lastName: request.profile.lastName,
      image: request.profile.image,
      bio: request.profile.bio,
      role: request.role
  };
};

exports.getRole = function getRole(checkRole) {
  let role;
  switch (checkRole) {
      case ROLE_ADMIN: role = 2; break;
      case ROLE_MEMBER: role = 1; break;
      default: role = 1;
  }

  return role;
};