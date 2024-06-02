const ROLE = {
  USER: "user",
  ADMIN: "admin",
};
const USER_CONSTANT = {
  NOT_FOUND: "User not found",
  FAILD_TO_DELETE: "Failed to delete user",
  FAILD_TO_GET_ALL: "Failed to get users",
  FAILD_TO_CREATED: "Failed to create user",
  FAILD_TO_UPDATE: "Failed to update user",
  FAILD_TO_GET_BY_ID: "Failed to get user by id",
  FAILD_TO_GET_BY_LOGIN_ID: "Failed to get user by login id",
  LOGIN_ID_EXIST: "Login id already exists",
};

const TOKEN_CONSTANT = {
  expiresIn: "86400s",
  TokenExpiredError: "TokenExpiredError",
};

module.exports = { ROLE, USER_CONSTANT, TOKEN_CONSTANT };
