const userModel = require("../models/user.model");
const ApiError = require("../utils/apiError.js");
const bcrypt = require("bcrypt");
const { ROLE, USER_CONSTANT } = require("../utils/constants.js");
const httpStatus = require("http-status");
const saltRounds = 10;
const tokenService = require("./token.service");
class UserService {
  static async createUser(loginId, password, email, firstName, lastName) {
    try {
      const newUser = {
        loginId,
        email,
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: ROLE.USER,
      };
      const loginIdExist = await userModel.getUserByLoginId(loginId);
      if (loginIdExist) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          USER_CONSTANT.LOGIN_ID_EXIST
        );
      }
      newUser.password = bcrypt.hashSync(password, saltRounds);
      await userModel.create(newUser);
      return true;
    } catch (error) {
      throw new ApiError(
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        error.message || USER_CONSTANT.FAILD_TO_CREATE
      );
    }
  }

  static async deleteUser(loginId) {
    try {
      const result = await userModel.delete(loginId);

      return result;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        USER_CONSTANT.FAILD_TO_DELETE
      );
    }
  }

  static async getAllUsers() {
    try {
      const users = await userModel.getAllUsers();
      return users;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        USER_CONSTANT.FAILT_TO_GET_ALL
      );
    }
  }

  static async getUserByLoginId(loginId) {
    try {
      const user = await userModel.getUserByLoginId(loginId);

      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_LOGIN_ID
        );
      }
      return user;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        USER_CONSTANT.FAILD_TO_GET_BY_ID
      );
    }
  }

  static async updateUser(loginId, email, firstName, lastName) {
    try {
      let user = await userModel.getUserByLoginId(loginId);
      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_ID
        );
      }
      user.loginId = loginId ?? user.loginId;
      user.email = email ?? user.email;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      await userModel.update(loginId, user);
      user = await userModel.getUserByLoginId(loginId);
      return user;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update user"
      );
    }
  }

  static async login(loginId, password) {
    try {
      const user = await userModel.getUserByLoginId(loginId);
      if (!user) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          USER_CONSTANT.FAILD_TO_GET_BY_ID
        );
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED);
      }
      const accessToken = tokenService.generateAccessToken(
        user.loginId,
        user.role
      );
      user.accessToken = accessToken;
      delete user.password;
      return user;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Login failed");
    }
  }
}

module.exports = UserService;
